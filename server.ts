import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON body parsing with large limit for PDF payloads
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Dedicated directory on the server for persistent presentation storage
const STORAGE_DIR = path.join(process.cwd(), 'assets', 'cloud_storage');
const PDF_PATH = path.join(STORAGE_DIR, 'presentation.pdf');
const META_PATH = path.join(STORAGE_DIR, 'presentation_meta.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// 1. GET /api/presentation/meta - Check if cloud presentation exists
app.get('/api/presentation/meta', (req, res) => {
  try {
    if (fs.existsSync(PDF_PATH)) {
      const stats = fs.statSync(PDF_PATH);
      let meta: any = {};
      if (fs.existsSync(META_PATH)) {
        try {
          meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
        } catch {
          meta = {};
        }
      }

      res.json({
        exists: true,
        fileName: meta.fileName || 'Presentation.pdf',
        sizeBytes: stats.size,
        updatedAt: meta.updatedAt || stats.mtime.toISOString(),
        cloudUrl: meta.cloudUrl || null,
      });
    } else if (fs.existsSync(META_PATH)) {
      const meta = JSON.parse(fs.readFileSync(META_PATH, 'utf-8'));
      if (meta.cloudUrl) {
        res.json({
          exists: true,
          fileName: meta.fileName || 'Cloud Presentation',
          sizeBytes: 0,
          updatedAt: meta.updatedAt || new Date().toISOString(),
          cloudUrl: meta.cloudUrl,
        });
        return;
      }
      res.json({ exists: false });
    } else {
      res.json({ exists: false });
    }
  } catch (error: any) {
    console.error('Error fetching presentation metadata:', error);
    res.status(500).json({ error: error.message });
  }
});

// 2. GET /api/presentation/pdf - Serve the stored PDF file directly
app.get('/api/presentation/pdf', (req, res) => {
  try {
    if (fs.existsSync(PDF_PATH)) {
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'inline; filename="presentation.pdf"');
      const stream = fs.createReadStream(PDF_PATH);
      stream.pipe(res);
    } else {
      res.status(404).json({ error: 'No presentation PDF stored on the server.' });
    }
  } catch (error: any) {
    console.error('Error serving presentation PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

// 3. POST /api/presentation/upload - Save uploaded PDF to server disk for all users
app.post('/api/presentation/upload', (req, res) => {
  try {
    const { base64Data, fileName } = req.body;
    if (!base64Data) {
      res.status(400).json({ error: 'Missing base64Data in request body.' });
      return;
    }

    // Strip data URL header if present (e.g. data:application/pdf;base64,...)
    const cleanBase64 = base64Data.replace(/^data:application\/pdf;base64,/, '');
    const buffer = Buffer.from(cleanBase64, 'base64');

    fs.writeFileSync(PDF_PATH, buffer);

    const meta = {
      fileName: fileName || 'Presentation.pdf',
      updatedAt: new Date().toISOString(),
      sizeBytes: buffer.length,
    };
    fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));

    console.log(`[Cloud Storage] Saved presentation PDF (${buffer.length} bytes): ${meta.fileName}`);
    res.json({ success: true, meta });
  } catch (error: any) {
    console.error('Error uploading presentation PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

// 4. POST /api/presentation/set-url - Save a cloud URL (e.g., Google Drive or direct PDF link)
app.post('/api/presentation/set-url', (req, res) => {
  try {
    const { cloudUrl, fileName } = req.body;
    if (!cloudUrl) {
      res.status(400).json({ error: 'Missing cloudUrl in request body.' });
      return;
    }

    const meta = {
      fileName: fileName || 'Cloud Presentation',
      cloudUrl: cloudUrl.trim(),
      updatedAt: new Date().toISOString(),
    };
    fs.writeFileSync(META_PATH, JSON.stringify(meta, null, 2));

    res.json({ success: true, meta });
  } catch (error: any) {
    console.error('Error setting cloud URL:', error);
    res.status(500).json({ error: error.message });
  }
});

// 5. DELETE /api/presentation/pdf - Remove stored PDF
app.delete('/api/presentation/pdf', (req, res) => {
  try {
    if (fs.existsSync(PDF_PATH)) fs.unlinkSync(PDF_PATH);
    if (fs.existsSync(META_PATH)) fs.unlinkSync(META_PATH);
    res.json({ success: true, message: 'Presentation removed from cloud storage.' });
  } catch (error: any) {
    console.error('Error deleting presentation PDF:', error);
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Vite middleware for development & static serving for production
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cloud Server running on port ${PORT}`);
  });
}

setupVite();
