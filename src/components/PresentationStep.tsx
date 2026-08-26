import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Upload,
  Maximize2,
  Minimize2,
  RefreshCw,
  FileText,
  CheckCircle2,
  Cloud,
  Globe,
  Sparkles,
  Layers,
  ArrowRight,
  Trash2,
  AlertCircle
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { SimulationStep } from '../types';
import { PRESENTATION_SLIDES, PresentationSlideData } from '../data/presentationSlides';

// Initialize PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.0.379'}/pdf.worker.min.mjs`;

interface PresentationStepProps {
  onNavigateToStep?: (step: SimulationStep) => void;
}

export const PresentationStep: React.FC<PresentationStepProps> = ({ onNavigateToStep }) => {
  // PDF state
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pdfName, setPdfName] = useState<string>('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');
  const [cloudPdfUrl, setCloudPdfUrl] = useState<string>('');
  
  // Loading & sync state
  const [loading, setLoading] = useState<boolean>(true);
  const [renderLoading, setRenderLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);
  const [cloudSynced, setCloudSynced] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  
  // Viewer state
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'pdf' | 'digital'>('pdf');
  const [digitalSlideIndex, setDigitalSlideIndex] = useState<number>(0);
  
  // Cloud URL input
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const [inputUrl, setInputUrl] = useState<string>('');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF from ArrayBuffer and initialize PDF.js
  const loadPdfFromBuffer = useCallback(async (buffer: ArrayBuffer, name: string) => {
    try {
      setRenderLoading(true);
      
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const doc = await loadingTask.promise;

      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setCurrentPage(1);
      setPdfName(name);
      setViewMode('pdf');
    } catch (err: any) {
      console.error('Error loading PDF with PDF.js:', err);
    } finally {
      setRenderLoading(false);
      setLoading(false);
    }
  }, []);

  // Fetch Cloud Presentation from Server (/api/presentation/meta & /api/presentation/pdf)
  const fetchCloudPresentation = useCallback(async () => {
    try {
      setLoading(true);
      const metaRes = await fetch('/api/presentation/meta');
      if (metaRes.ok) {
        const meta = await metaRes.json();
        if (meta.exists) {
          if (meta.cloudUrl) {
            setCloudPdfUrl(meta.cloudUrl);
            setPdfName(meta.fileName || 'Cloud Presentation');
            setCloudSynced(true);
            setLoading(false);
            return;
          }

          // Fetch stored PDF file
          const pdfRes = await fetch('/api/presentation/pdf');
          if (pdfRes.ok) {
            const arrayBuffer = await pdfRes.arrayBuffer();
            await loadPdfFromBuffer(arrayBuffer, meta.fileName || 'Presentation.pdf');
            setCloudSynced(true);
            return;
          }
        }
      }
      // If no cloud presentation uploaded yet, fall back to digital slides view
      setLoading(false);
    } catch (err) {
      console.error('Error fetching cloud presentation:', err);
      setLoading(false);
    }
  }, [loadPdfFromBuffer]);

  useEffect(() => {
    fetchCloudPresentation();
  }, [fetchCloudPresentation]);

  // Render current PDF page to canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || viewMode !== 'pdf') return;

    let isCancelled = false;

    const renderPage = async () => {
      try {
        setRenderLoading(true);
        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // Ignore cancel errors
          }
        }

        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const containerWidth = canvas.parentElement?.clientWidth || 900;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = Math.min(2.5, Math.max(1.2, (containerWidth * 1.8) / unscaledViewport.width));
        const viewport = page.getViewport({ scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;
        await renderTask.promise;
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.error('Error rendering page:', err);
        }
      } finally {
        if (!isCancelled) {
          setRenderLoading(false);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        try {
          renderTaskRef.current.cancel();
        } catch {
          // Ignore
        }
      }
    };
  }, [pdfDoc, currentPage, viewMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        if (viewMode === 'pdf') {
          setCurrentPage((prev) => Math.min(totalPages || 1, prev + 1));
        } else {
          setDigitalSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1));
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (viewMode === 'pdf') {
          setCurrentPage((prev) => Math.max(1, prev - 1));
        } else {
          setDigitalSlideIndex((prev) => Math.max(0, prev - 1));
        }
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, viewMode, isFullscreen]);

  // Upload PDF to server so anyone accessing the app sees it
  const handleUploadFile = async (file: File) => {
    try {
      setUploading(true);
      setStatusMessage('Uploading and syncing PDF to cloud storage...');

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        
        const response = await fetch('/api/presentation/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data,
            fileName: file.name,
          }),
        });

        if (response.ok) {
          const buffer = await file.arrayBuffer();
          await loadPdfFromBuffer(buffer, file.name);
          setCloudSynced(true);
          setStatusMessage('Saved to Cloud! Visible to all viewers.');
          setTimeout(() => setStatusMessage(''), 4000);
        } else {
          setStatusMessage('Failed to save to cloud.');
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err: any) {
      console.error('Error uploading file to server:', err);
      setStatusMessage('Upload error: ' + err.message);
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUploadFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      handleUploadFile(file);
    }
  };

  const handleSaveCloudUrl = async () => {
    if (!inputUrl.trim()) return;
    try {
      setUploading(true);
      let url = inputUrl.trim();
      // Auto convert Google Drive preview link to embed link if needed
      if (url.includes('drive.google.com/file/d/')) {
        url = url.replace(/\/view.*$/, '/preview');
      }

      const res = await fetch('/api/presentation/set-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cloudUrl: url,
          fileName: 'Cloud Presentation Link',
        }),
      });

      if (res.ok) {
        setCloudPdfUrl(url);
        setPdfName('Cloud Presentation');
        setCloudSynced(true);
        setShowUrlInput(false);
        setViewMode('pdf');
      }
    } catch (err) {
      console.error('Error saving cloud URL:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteCloudPdf = async () => {
    try {
      await fetch('/api/presentation/pdf', { method: 'DELETE' });
      setPdfDoc(null);
      setPdfBlobUrl('');
      setCloudPdfUrl('');
      setCloudSynced(false);
      setTotalPages(0);
      setCurrentPage(1);
      setViewMode('digital');
    } catch (err) {
      console.error('Error deleting presentation:', err);
    }
  };

  const currentDigitalSlide: PresentationSlideData = PRESENTATION_SLIDES[digitalSlideIndex] || PRESENTATION_SLIDES[0];

  return (
    <div
      className={`w-full flex flex-col items-center justify-center select-none ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col justify-between overflow-y-auto'
          : 'max-w-5xl mx-auto py-2'
      }`}
      id="presentation-pdf-viewer"
    >
      {/* Top Notification Status */}
      {statusMessage && (
        <div className="mb-2 px-4 py-2 rounded-xl bg-emerald-950 border border-emerald-500/60 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* CASE 1: LOADING STATE */}
      {loading && (
        <div className="w-full aspect-[16/9] bg-slate-950 rounded-3xl border border-slate-800 flex flex-col items-center justify-center p-8 space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-xs font-mono text-slate-400">Loading Cloud Presentation Deck...</p>
        </div>
      )}

      {/* CASE 2: CLOUD PRESENTATION ACTIVE (PDF OR EMBED) */}
      {!loading && (pdfDoc || cloudPdfUrl || pdfBlobUrl) && viewMode === 'pdf' && (
        <div className="w-full flex flex-col items-center space-y-3">
          {/* Top Cloud Status Bar */}
          <div className="w-full flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2 text-slate-400 truncate max-w-xs sm:max-w-md font-mono text-[11px]">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
                <Cloud className="w-3 h-3 text-cyan-400" />
                <span>Cloud Synced</span>
              </span>
              <span className="truncate text-white font-bold">{pdfName || 'Presentation.pdf'}</span>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept=".pdf,application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              <button
                onClick={() => setViewMode('digital')}
                className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-1"
                title="Switch to Digital Seminar Slides"
              >
                <Layers className="w-3 h-3" />
                <span className="hidden sm:inline">Digital Slides</span>
              </button>

              <span className="text-slate-700">|</span>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-1"
                title="Replace Cloud PDF for all users"
              >
                <Upload className="w-3 h-3" />
                <span>Replace Cloud PDF</span>
              </button>

              <span className="text-slate-700">|</span>

              <button
                onClick={handleDeleteCloudPdf}
                className="text-[11px] font-mono text-rose-400/80 hover:text-rose-300 transition cursor-pointer"
                title="Delete from Cloud"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* MAIN 16:9 PRESENTATION STAGE */}
          <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group">
            {/* Canvas Render */}
            {pdfDoc ? (
              <div className="w-full h-full flex items-center justify-center p-2 overflow-auto custom-scrollbar">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : cloudPdfUrl ? (
              <iframe
                src={cloudPdfUrl}
                className="w-full h-full border-none rounded-xl"
                title="Cloud Presentation"
                allow="autoplay"
              />
            ) : pdfBlobUrl ? (
              <iframe
                src={`${pdfBlobUrl}#toolbar=0&navpanes=0&scrollbar=0&page=${currentPage}`}
                className="w-full h-full border-none rounded-xl"
                title="PDF Document"
              />
            ) : null}

            {/* Render loading overlay */}
            {renderLoading && (
              <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs flex items-center justify-center pointer-events-none">
                <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
              </div>
            )}

            {/* Left Click Zone (Back) */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
              title="Back (Left Arrow / Page Up)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Click Zone (Ahead) */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages || 1, prev + 1))}
              disabled={currentPage >= totalPages}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
              title="Ahead (Right Arrow / Space / Page Down)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* BOTTOM CONTROLS: Back, Page Dropdown, Ahead, Fullscreen */}
          <div className="w-full flex items-center justify-between px-2 pt-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white text-xs font-bold border border-slate-800 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
              <span>Page</span>
              <select
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="bg-slate-950 text-cyan-400 font-black px-2 py-0.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer text-xs"
              >
                {Array.from({ length: totalPages || 1 }, (_, i) => i + 1).map((pg) => (
                  <option key={pg} value={pg} className="bg-slate-950 text-white">
                    {pg}
                  </option>
                ))}
              </select>
              <span>of <strong className="text-white">{totalPages || 1}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(totalPages || 1, prev + 1))}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-slate-950 text-xs font-black transition cursor-pointer shadow-md"
              >
                <span>Ahead</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CASE 3: NO CLOUD PDF YET OR DIGITAL SLIDES VIEW MODE */}
      {!loading && (!pdfDoc && !cloudPdfUrl && !pdfBlobUrl || viewMode === 'digital') && (
        <div className="w-full flex flex-col items-center space-y-4">
          
          {/* Cloud Upload Banner */}
          <div
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            className={`w-full bg-slate-900 border-2 rounded-3xl p-5 transition-all shadow-xl ${
              isDragOver ? 'border-cyan-400 bg-cyan-950/20' : 'border-slate-800'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-center sm:text-left">
                <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-400 flex-shrink-0">
                  <Cloud className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white flex items-center gap-2 justify-center sm:justify-start">
                    <span>Cloud Presentation Storage</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded-full border border-cyan-800">
                      Persistent for All Visitors
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload your PDF once to the cloud server so anyone opening the app or PPT deck sees it automatically.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap justify-center flex-shrink-0">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition shadow-md cursor-pointer hover:scale-105"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{uploading ? 'Syncing...' : 'Upload PDF to Cloud'}</span>
                </button>

                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Link Cloud URL</span>
                </button>
              </div>
            </div>

            {/* Cloud URL link input modal/tray */}
            {showUrlInput && (
              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center gap-2">
                <input
                  type="url"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="Paste Google Drive, Dropbox, or Cloud-hosted PDF URL..."
                  className="flex-1 w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-white focus:outline-none font-mono"
                />
                <button
                  onClick={handleSaveCloudUrl}
                  disabled={uploading || !inputUrl.trim()}
                  className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-slate-950 font-black text-xs rounded-xl transition cursor-pointer"
                >
                  Save Cloud Link
                </button>
              </div>
            )}
          </div>

          {/* Built-in 27-Slide Digital Deck Display */}
          <div className="w-full flex flex-col items-center space-y-3">
            {/* Top Bar */}
            <div className="w-full flex items-center justify-between px-2 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-slate-800 text-cyan-400 border border-slate-700">
                  Slide {digitalSlideIndex + 1} of {PRESENTATION_SLIDES.length}
                </span>
                <span className="text-slate-400 font-medium hidden sm:inline">
                  {currentDigitalSlide.section}
                </span>
              </div>

              {(pdfDoc || cloudPdfUrl) && (
                <button
                  onClick={() => setViewMode('pdf')}
                  className="text-[11px] font-mono text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>Switch to Attached PDF</span>
                </button>
              )}
            </div>

            {/* Digital Slide 16:9 Frame */}
            <div className="relative w-full aspect-[16/9] bg-slate-950 text-slate-100 rounded-2xl border-2 border-slate-800 shadow-2xl flex flex-col justify-between p-6 sm:p-10 overflow-hidden group">
              <div className="relative z-10 flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase px-3 py-1 rounded-full ${currentDigitalSlide.badgeColor}`}>
                  {currentDigitalSlide.badge}
                </span>
                <div className="text-xs font-mono font-bold text-slate-400">
                  Slide <span className="text-white font-black">{currentDigitalSlide.slideNumber}</span> / {PRESENTATION_SLIDES.length}
                </div>
              </div>

              {/* Slide Body */}
              <div className="relative z-10 my-auto py-3 overflow-y-auto max-h-[70%] custom-scrollbar">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mb-1">
                  {currentDigitalSlide.title}
                </h2>
                {currentDigitalSlide.subtitle && (
                  <p className="text-xs sm:text-sm text-cyan-300 font-medium mb-3">
                    {currentDigitalSlide.subtitle}
                  </p>
                )}

                {/* Team metadata on Slide 1 */}
                {currentDigitalSlide.visualType === 'title' && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                    {currentDigitalSlide.visualMeta?.teamMembers?.map((m, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 text-center">
                        <div className="text-xs font-black text-white">{m.name}</div>
                        <div className="text-[10px] font-mono text-cyan-400 font-bold">{m.roll}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bullet Points */}
                {currentDigitalSlide.bulletPoints && currentDigitalSlide.visualType !== 'title' && (
                  <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-2">
                    {currentDigitalSlide.bulletPoints.map((bp, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                        <span>{bp}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Left/Right click targets */}
              <button
                onClick={() => setDigitalSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={digitalSlideIndex === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
                title="Back"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={() => setDigitalSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))}
                disabled={digitalSlideIndex === PRESENTATION_SLIDES.length - 1}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
                title="Ahead"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom footer */}
              <div className="relative z-10 flex items-center justify-between border-t border-slate-800/80 pt-2 text-[11px] text-slate-500 font-mono">
                <span>Nature Inspired Storage & Computing • BTECH CE-C</span>
                <span>Use ← and → keys to navigate</span>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="w-full flex items-center justify-between px-2 pt-1">
              <button
                onClick={() => setDigitalSlideIndex((prev) => Math.max(0, prev - 1))}
                disabled={digitalSlideIndex === 0}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white text-xs font-bold border border-slate-800 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                <select
                  value={digitalSlideIndex}
                  onChange={(e) => setDigitalSlideIndex(Number(e.target.value))}
                  className="bg-slate-950 text-cyan-400 font-bold px-2 py-0.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer text-xs"
                >
                  {PRESENTATION_SLIDES.map((s, idx) => (
                    <option key={s.id} value={idx} className="bg-slate-950 text-white">
                      Slide {s.slideNumber}: {s.title.substring(0, 30)}...
                    </option>
                  ))}
                </select>
                <span>/ {PRESENTATION_SLIDES.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition cursor-pointer"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setDigitalSlideIndex((prev) => Math.min(PRESENTATION_SLIDES.length - 1, prev + 1))}
                  disabled={digitalSlideIndex === PRESENTATION_SLIDES.length - 1}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-slate-950 text-xs font-black transition cursor-pointer shadow-md"
                >
                  <span>Ahead</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
