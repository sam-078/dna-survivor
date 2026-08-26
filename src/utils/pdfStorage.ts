// IndexedDB storage for PDF files to persist across reloads
const DB_NAME = 'DnaStoragePptDb';
const STORE_NAME = 'pdfStore';
const PDF_KEY = 'attachedPresentationPdf';
const PDF_NAME_KEY = 'attachedPresentationPdfName';

export async function openPdfDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePdfToDb(fileData: ArrayBuffer, fileName: string): Promise<void> {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(fileData, PDF_KEY);
    store.put(fileName, PDF_NAME_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function getPdfFromDb(): Promise<{ data: ArrayBuffer; name: string } | null> {
  try {
    const db = await openPdfDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const dataReq = store.get(PDF_KEY);
      const nameReq = store.get(PDF_NAME_KEY);

      tx.oncomplete = () => {
        if (dataReq.result) {
          resolve({
            data: dataReq.result as ArrayBuffer,
            name: (nameReq.result as string) || 'presentation.pdf',
          });
        } else {
          resolve(null);
        }
      };
      tx.onerror = () => reject(tx.error);
    });
  } catch {
    return null;
  }
}

export async function clearPdfFromDb(): Promise<void> {
  const db = await openPdfDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(PDF_KEY);
    store.delete(PDF_NAME_KEY);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
