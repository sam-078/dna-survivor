import React from 'react';
import { Sparkles, HelpCircle, Sliders, RotateCcw, ShieldCheck, Dna, Presentation, BookOpen } from 'lucide-react';

interface HeaderProps {
  onOpenHowItWorks: () => void;
  onOpenSettings: () => void;
  onOpenPpt: () => void;
  onOpenReferences: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenHowItWorks,
  onOpenSettings,
  onOpenPpt,
  onOpenReferences,
  onReset,
}) => {
  return (
    <header className="w-full bg-indigo-600 border-b border-indigo-400 shadow-lg text-white sticky top-0 z-40" id="main-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 bg-cyan-400 rounded-full flex items-center justify-center border-2 border-white text-indigo-900 font-black shadow-md flex-shrink-0">
            <span className="text-xl">🧬</span>
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                <span>DNA DATA SURVIVOR</span>
                <span className="bg-white/20 text-white font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border border-white/30">
                  v2.6
                </span>
              </h1>
              <div className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-indigo-700/70 text-indigo-100 border border-indigo-400/50">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-300" />
                <span>Simulation Model</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-indigo-100 font-medium tracking-wide opacity-90">
              Can your data survive evolution? <span className="text-indigo-200 hidden md:inline">| Nature-Inspired Molecular Storage</span>
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
          <button
            id="header-ppt-btn"
            onClick={onOpenPpt}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition shadow-sm cursor-pointer"
            title="Open Presentation PPT Slide Deck"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-300" />
            <span>PPT Deck</span>
          </button>

          <button
            id="header-references-btn"
            onClick={onOpenReferences}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition shadow-sm cursor-pointer"
            title="Open Academic References & Literature Links"
          >
            <BookOpen className="w-3.5 h-3.5 text-purple-300" />
            <span>References</span>
          </button>

          <button
            id="header-how-it-works-btn"
            onClick={onOpenHowItWorks}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition shadow-sm cursor-pointer"
            title="Learn how DNA Storage and Genetic Algorithms work"
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-300" />
            <span>How It Works</span>
          </button>

          <button
            id="header-settings-btn"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-white/20 hover:bg-white/30 text-white border border-white/30 transition shadow-sm cursor-pointer"
            title="Configure Genetic Algorithm parameters"
          >
            <Sliders className="w-3.5 h-3.5 text-amber-300" />
            <span>Settings</span>
          </button>

          <button
            id="header-reset-btn"
            onClick={onReset}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-black bg-rose-500 hover:bg-rose-400 text-slate-950 border border-rose-300 transition shadow-sm cursor-pointer"
            title="Reset simulation to initial state"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};

