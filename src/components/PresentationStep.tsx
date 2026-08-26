import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileText,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RefreshCw,
  Sparkles,
  Upload,
  CheckCircle2,
  Layers,
  Presentation,
  ShieldCheck
} from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { SimulationStep } from '../types';
import { PRESENTATION_SLIDES, PresentationSlideData } from '../data/presentationSlides';

// Use same-origin local worker to prevent Chrome CSP/CORS blocking
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

interface PresentationStepProps {
  onNavigateToStep?: (step: SimulationStep) => void;
}

export const PresentationStep: React.FC<PresentationStepProps> = ({ onNavigateToStep }) => {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [zoom, setZoom] = useState<number>(1.0);
  const [rotation, setRotation] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [renderLoading, setRenderLoading] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'pdf' | 'digital'>('pdf');
  const [pdfFileName, setPdfFileName] = useState<string>('EOB FINAL pdf.pdf');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const renderTaskRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Load PDF by fetching arrayBuffer directly to bypass any Chrome plugin or CORS issues
  const loadPdf = useCallback(async (url: string) => {
    try {
      setLoading(true);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const arrayBuffer = await res.arrayBuffer();

      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(arrayBuffer),
        cMapUrl: '/cmaps/',
        cMapPacked: true,
      });

      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setCurrentPage(1);
      setActiveMode('pdf');
    } catch (err: any) {
      console.warn('PDF.js binary load error, defaulting to Digital Slide deck:', err);
      // Seamlessly fall back to high-res digital slide deck if PDF rendering fails
      setActiveMode('digital');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPdf('/presentation.pdf');
  }, [loadPdf]);

  // Render current PDF page on HTML5 Canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || activeMode !== 'pdf') return;

    let isCancelled = false;

    const renderPage = async () => {
      try {
        setRenderLoading(true);

        if (renderTaskRef.current) {
          try {
            renderTaskRef.current.cancel();
          } catch {
            // Ignore cancel exceptions
          }
        }

        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const containerWidth = canvas.parentElement?.clientWidth || 900;
        const unscaledViewport = page.getViewport({ scale: 1.0, rotation });
        
        // High-DPI crisp scale calculation
        const baseScale = (containerWidth / unscaledViewport.width) * 1.6;
        const finalScale = baseScale * zoom;
        const viewport = page.getViewport({ scale: finalScale, rotation });

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
          console.error('Error rendering PDF page on canvas:', err);
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
  }, [pdfDoc, currentPage, zoom, rotation, activeMode]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['input', 'textarea'].includes((e.target as HTMLElement)?.tagName?.toLowerCase())) return;

      const maxPages = activeMode === 'pdf' ? (totalPages || 1) : PRESENTATION_SLIDES.length;

      if (e.key === 'ArrowRight' || e.key === 'Space' || e.key === 'PageDown') {
        e.preventDefault();
        setCurrentPage((prev) => Math.min(maxPages, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((prev) => Math.max(1, prev - 1));
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, isFullscreen, activeMode]);

  // Replace / Upload new PDF file
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfFileName(file.name);
    try {
      const buffer = await file.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({
        data: new Uint8Array(buffer),
        cMapUrl: '/cmaps/',
        cMapPacked: true,
      });
      const doc = await loadingTask.promise;
      setPdfDoc(doc);
      setTotalPages(doc.numPages);
      setCurrentPage(1);
      setActiveMode('pdf');

      // Also persist to server backend
      const reader = new FileReader();
      reader.onload = async () => {
        await fetch('/api/presentation/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Data: reader.result as string,
            fileName: file.name,
          }),
        });
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Upload parse error:', err);
    }
  };

  const currentDigitalSlide: PresentationSlideData = PRESENTATION_SLIDES[currentPage - 1] || PRESENTATION_SLIDES[0];

  return (
    <div
      className={`w-full flex flex-col items-center justify-center select-none ${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-slate-950 p-4 flex flex-col justify-between overflow-y-auto'
          : 'max-w-5xl mx-auto py-2'
      }`}
      id="presentation-pdf-viewer"
    >
      {/* TOP ATTACHED PDF STATUS BAR */}
      <div className="w-full flex items-center justify-between mb-3 px-2 text-xs flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-700 font-mono font-bold text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>ATTACHED PRESENTATION</span>
          </span>
          <span className="text-white font-mono font-bold text-xs truncate max-w-xs sm:max-w-md">
            {pdfFileName}
          </span>
          <span className="text-emerald-400 font-mono text-[11px] bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
            Chrome Sandbox Safe
          </span>
        </div>

        {/* Top Control Actions */}
        <div className="flex items-center gap-2">
          <input
            type="file"
            ref={fileInputRef}
            accept=".pdf,application/pdf"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Mode Switcher */}
          <div className="flex items-center bg-slate-900 rounded-xl p-0.5 border border-slate-800">
            <button
              onClick={() => setActiveMode('pdf')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1 ${
                activeMode === 'pdf' ? 'bg-cyan-600 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Presentation className="w-3 h-3" />
              <span>PDF Render</span>
            </button>
            <button
              onClick={() => setActiveMode('digital')}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition cursor-pointer flex items-center gap-1 ${
                activeMode === 'digital' ? 'bg-cyan-600 text-slate-950 shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>Digital Deck</span>
            </button>
          </div>

          <a
            href="/presentation.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition cursor-pointer flex items-center gap-1 text-xs"
            title="Open original PDF in new browser tab"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Open Tab</span>
          </a>

          <a
            href="/presentation.pdf"
            download="EOB FINAL presentation.pdf"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition cursor-pointer"
            title="Download PDF"
          >
            <Download className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-800 transition cursor-pointer"
            title="Update or Replace PDF"
          >
            <Upload className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 16:9 MAIN STAGE CONTAINER */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center group">
        
        {/* MODE 1: High-DPI Canvas Rendering (Never blocked by Chrome) */}
        {activeMode === 'pdf' && !loading && (
          <div className="w-full h-full flex items-center justify-center p-2 sm:p-4 overflow-auto custom-scrollbar">
            <canvas
              ref={canvasRef}
              className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
            />
          </div>
        )}

        {/* MODE 2: Digital Slide Presentation Deck (Full 27 Slides) */}
        {activeMode === 'digital' && (
          <div className="w-full h-full p-6 sm:p-10 flex flex-col justify-between overflow-y-auto custom-scrollbar bg-slate-950">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase px-3 py-1 rounded-full ${currentDigitalSlide.badgeColor}`}>
                {currentDigitalSlide.badge}
              </span>
              <div className="text-xs font-mono font-bold text-slate-400">
                Slide <span className="text-white font-black">{currentDigitalSlide.slideNumber}</span> / {PRESENTATION_SLIDES.length}
              </div>
            </div>

            <div className="my-auto py-3 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                {currentDigitalSlide.title}
              </h2>
              {currentDigitalSlide.subtitle && (
                <p className="text-xs sm:text-sm text-cyan-300 font-medium">
                  {currentDigitalSlide.subtitle}
                </p>
              )}

              {currentDigitalSlide.bulletPoints && (
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

            <div className="flex items-center justify-between border-t border-slate-800 pt-2 text-[11px] text-slate-500 font-mono">
              <span>Nature Inspired Storage & Computing • BTECH CE-C</span>
              <span>Use ← and → keys to navigate</span>
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {(loading || renderLoading) && (
          <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs flex flex-col items-center justify-center space-y-3 z-30 pointer-events-none">
            <RefreshCw className="w-8 h-8 text-cyan-400 animate-spin" />
            <p className="text-xs font-mono text-cyan-300 font-bold">
              Rendering Presentation Slide {currentPage}...
            </p>
          </div>
        )}

        {/* Left / Right Advance Click Zones */}
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage <= 1}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-2xl opacity-30 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
          title="Previous Slide (Left Arrow / PageUp)"
        >
          <ChevronLeft className="w-7 h-7" />
        </button>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(activeMode === 'pdf' ? (totalPages || 1) : PRESENTATION_SLIDES.length, prev + 1))}
          disabled={currentPage >= (activeMode === 'pdf' ? totalPages : PRESENTATION_SLIDES.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/90 hover:bg-slate-800 text-white flex items-center justify-center border border-slate-700 shadow-2xl opacity-30 group-hover:opacity-100 disabled:opacity-0 transition cursor-pointer z-20"
          title="Next Slide (Right Arrow / Space / PageDown)"
        >
          <ChevronRight className="w-7 h-7" />
        </button>
      </div>

      {/* BOTTOM SLIDE CONTROLS */}
      <div className="w-full flex items-center justify-between mt-3 px-2 flex-wrap gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage <= 1}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-30 text-white text-xs font-bold border border-slate-800 transition cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
            <span>Slide</span>
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(Number(e.target.value))}
              className="bg-slate-950 text-cyan-400 font-black px-2.5 py-0.5 rounded-lg border border-slate-800 focus:outline-none cursor-pointer text-xs"
            >
              {Array.from({ length: activeMode === 'pdf' ? (totalPages || 1) : PRESENTATION_SLIDES.length }, (_, i) => i + 1).map((pg) => (
                <option key={pg} value={pg} className="bg-slate-950 text-white">
                  Slide {pg}
                </option>
              ))}
            </select>
            <span>of <strong className="text-white font-bold">{activeMode === 'pdf' ? totalPages : PRESENTATION_SLIDES.length}</strong></span>
          </div>

          {activeMode === 'pdf' && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900 px-2 py-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setZoom((z) => Math.max(0.7, z - 0.15))}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[11px] font-mono text-slate-400 px-1">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
                className="p-1 text-slate-400 hover:text-white cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-1 text-slate-400 hover:text-white cursor-pointer ml-1"
                title="Rotate 90°"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.min(activeMode === 'pdf' ? totalPages : PRESENTATION_SLIDES.length, prev + 1))}
            disabled={currentPage >= (activeMode === 'pdf' ? totalPages : PRESENTATION_SLIDES.length)}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 disabled:opacity-30 text-slate-950 text-xs font-black transition cursor-pointer shadow-md"
          >
            <span>Ahead</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
