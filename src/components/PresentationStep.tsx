import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Upload, Maximize2, Minimize2, RefreshCw, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { savePdfToDb, getPdfFromDb, clearPdfFromDb } from '../utils/pdfStorage';
import { SimulationStep } from '../types';

// Set up pdfjs worker using unpkg or cdnjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version || '4.0.379'}/pdf.worker.min.mjs`;

interface PresentationStepProps {
  onNavigateToStep?: (step: SimulationStep) => void;
}

export const PresentationStep: React.FC<PresentationStepProps> = () => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [pdfName, setPdfName] = useState<string>('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [renderLoading, setRenderLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const renderTaskRef = useRef<any>(null);

  // Load PDF from ArrayBuffer
  const loadPdfFromBuffer = useCallback(async (buffer: ArrayBuffer, name: string) => {
    try {
      setLoading(true);
      setErrorMessage('');
      
      // Create blob URL for iframe fallback or direct viewing
      const blob = new Blob([buffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);

      const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(buffer) });
      const doc = await loadingTask.promise;

      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setCurrentPage(1);
      setPdfName(name);
      await savePdfToDb(buffer, name);
    } catch (err: any) {
      console.error('Error loading PDF with PDF.js:', err);
      setErrorMessage('Could not render PDF with canvas engine. Native PDF preview is active.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Check IndexedDB on mount for previously attached PDF
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const stored = await getPdfFromDb();
        if (stored && isMounted) {
          await loadPdfFromBuffer(stored.data, stored.name);
        } else {
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [loadPdfFromBuffer]);

  // Render current page to canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

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

        // Calculate dynamic scale to match canvas container width smoothly
        const containerWidth = canvas.parentElement?.clientWidth || 900;
        const unscaledViewport = page.getViewport({ scale: 1.0 });
        const scale = Math.min(2.5, Math.max(1.0, (containerWidth * 1.8) / unscaledViewport.width));
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
  }, [pdfDoc, currentPage]);

  // Keyboard navigation (Arrow Left = Back, Arrow Right = Ahead)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(totalPages || 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, isFullscreen]);

  // Handle file input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const buffer = await file.arrayBuffer();
      await loadPdfFromBuffer(buffer, file.name);
    }
  };

  // Handle Drag and Drop
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type === 'application/pdf') {
      const buffer = await file.arrayBuffer();
      await loadPdfFromBuffer(buffer, file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleClearPdf = async () => {
    await clearPdfFromDb();
    setPdfDoc(null);
    setPdfBlobUrl('');
    setTotalPages(0);
    setCurrentPage(1);
    setPdfName('');
  };

  return (
    <div
      className={`w-full flex flex-col items-center justify-center select-none ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col justify-between overflow-y-auto'
          : 'max-w-5xl mx-auto py-2'
      }`}
      id="presentation-pdf-viewer"
    >
      {/* CASE 1: NO PDF ATTACHED YET - DIRECT 1-CLICK ATTACH ZONE */}
      {!pdfDoc && !pdfBlobUrl && !loading && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`w-full aspect-[16/9] min-h-[420px] rounded-3xl border-3 border-dashed flex flex-col items-center justify-center p-8 text-center transition-all ${
            isDragOver
              ? 'border-cyan-400 bg-cyan-950/30 scale-[1.01]'
              : 'border-slate-800 bg-slate-950 hover:border-slate-700'
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="p-4 rounded-3xl bg-slate-900 border border-slate-800 text-cyan-400 mb-4 shadow-xl">
            <FileText className="w-12 h-12" />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Attach Your Presentation PDF
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-6 leading-relaxed">
            Drag and drop your PDF file here, or click below to select your PDF. It will immediately display in full-screen slide format with back and ahead controls.
          </p>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-sm transition shadow-xl cursor-pointer hover:scale-105 active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>Select PDF File</span>
          </button>

          <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-500 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Auto-saves locally • Full 16:9 view • Back & Ahead navigation</span>
          </div>
        </div>
      )}

      {/* CASE 2: LOADING STATE */}
      {loading && (
        <div className="w-full aspect-[16/9] bg-slate-950 rounded-3xl border border-slate-800 flex flex-col items-center justify-center p-8 space-y-3">
          <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
          <p className="text-xs font-mono text-slate-400">Loading Presentation PDF...</p>
        </div>
      )}

      {/* CASE 3: PDF ATTACHED - PURE DIRECT PDF VIEWER ONLY */}
      {(pdfDoc || pdfBlobUrl) && !loading && (
        <div className="w-full flex flex-col items-center space-y-3">
          
          {/* Top minimal status bar with replace file option */}
          <div className="w-full flex items-center justify-between px-2 text-xs">
            <div className="flex items-center gap-2 text-slate-400 truncate max-w-xs sm:max-w-md font-mono text-[11px]">
              <FileText className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
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
                onClick={() => fileInputRef.current?.click()}
                className="text-[11px] font-mono text-slate-400 hover:text-cyan-300 transition cursor-pointer flex items-center gap-1"
                title="Change attached PDF"
              >
                <Upload className="w-3 h-3" />
                <span>Replace PDF</span>
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={handleClearPdf}
                className="text-[11px] font-mono text-rose-400/80 hover:text-rose-300 transition cursor-pointer"
                title="Remove attached PDF"
              >
                Detach
              </button>
            </div>
          </div>

          {/* MAIN PDF STAGE */}
          <div className="relative w-full aspect-[16/9] bg-slate-950 rounded-2xl border-2 border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group">
            
            {/* Canvas PDF Page Rendering */}
            {pdfDoc ? (
              <div className="w-full h-full flex items-center justify-center p-2 overflow-auto custom-scrollbar">
                <canvas
                  ref={canvasRef}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                />
              </div>
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

            {/* Left Click Advance Target (Back) */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
              title="Back (Left Arrow / Page Up)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Click Advance Target (Ahead) */}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages || 1, prev + 1))}
              disabled={currentPage >= totalPages}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-xl opacity-20 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
              title="Ahead (Right Arrow / Space / Page Down)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* BOTTOM CONTROLS ONLY: Back, Page Counter, Ahead, Fullscreen */}
          <div className="w-full flex items-center justify-between px-2 pt-1">
            {/* Back Button */}
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white text-xs font-bold border border-slate-800 transition cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            {/* Page Selector & Counter */}
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

            {/* Ahead & Fullscreen */}
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
    </div>
  );
};
