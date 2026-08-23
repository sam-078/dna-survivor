import React, { useState } from 'react';
import { EncodedData, DnaBase } from '../types';
import { BASE_MAPPINGS, BASE_COLORS } from '../utils/dnaEncoding';
import {
  Binary,
  Dna,
  ArrowRight,
  Database,
  Layers,
  Sparkles,
  Info,
  CheckCircle2,
} from 'lucide-react';

interface EncodeStepProps {
  encodedData: EncodedData;
  onUpdateText: (newText: string) => void;
  onProceedToEvolve: () => void;
}

const PRESET_MESSAGES = [
  'HELLO WORLD',
  'SAVE THE BEES',
  'VOYAGER 1977',
  'DNA=FUTURE',
  'QUANTUM CODE',
];

export const EncodeStep: React.FC<EncodeStepProps> = ({
  encodedData,
  onUpdateText,
  onProceedToEvolve,
}) => {
  const [inputText, setInputText] = useState(encodedData.originalText);
  const [hoveredBaseIdx, setHoveredBaseIdx] = useState<number | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase().slice(0, 40); // Cap at 40 chars for clean display
    setInputText(val);
    onUpdateText(val);
  };

  const handlePresetClick = (preset: string) => {
    setInputText(preset);
    onUpdateText(preset);
  };

  // Group binary into 8-bit bytes for clean visual layout
  const binaryBytes: string[] = [];
  for (let i = 0; i < encodedData.binaryString.length; i += 8) {
    binaryBytes.push(encodedData.binaryString.slice(i, i + 8));
  }

  return (
    <div className="space-y-6" id="step-encode-container">
      {/* Step Header Banner */}
      <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">
              <Binary className="w-4 h-4 text-cyan-400" />
              <span>Step 1: Digital to Molecular Encoding</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Convert Digital Bits into DNA Bases (A, T, C, G)
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Every digital character is converted to 8 binary bits. In DNA storage, each nucleotide base stores <strong className="text-cyan-300 font-bold">2 bits</strong> (00=A, 01=C, 10=G, 11=T), packing petabytes of data into microscopic volume.
            </p>
          </div>

          <button
            id="encode-proceed-btn"
            onClick={onProceedToEvolve}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition cursor-pointer flex-shrink-0"
          >
            <span>Proceed to Evolution</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Text Input & Presets */}
        <div className="lg:col-span-1 bg-slate-900 border-2 border-indigo-500 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
          <h3 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">
            1. Input Data
          </h3>
          
          <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 space-y-1.5 shadow-inner">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                MESSAGE
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                {inputText.length}/40
              </span>
            </div>
            <input
              id="message-input"
              type="text"
              value={inputText}
              onChange={handleInputChange}
              placeholder="e.g. HELLO WORLD"
              className="w-full bg-slate-950 border-2 border-slate-700 focus:border-cyan-400 rounded-xl px-4 py-2.5 text-lg font-mono text-cyan-300 placeholder-slate-600 focus:outline-none transition"
              maxLength={40}
            />
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Preset Messages:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {PRESET_MESSAGES.map((preset) => (
                <button
                  key={preset}
                  id={`preset-${preset.replace(/\s+/g, '-').toLowerCase()}`}
                  onClick={() => handlePresetClick(preset)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-mono transition cursor-pointer font-bold ${
                    inputText === preset
                      ? 'bg-cyan-400 text-slate-950 border-cyan-300 shadow-md shadow-cyan-400/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700/80 hover:text-white'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* 2-Bit Mapping Reference Card */}
          <div className="bg-slate-950 rounded-2xl border border-indigo-900/60 p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-indigo-300 font-bold uppercase tracking-wider">
              <span>2-Bit Mapping Schema</span>
              <span className="text-[10px] bg-indigo-900/80 text-cyan-300 px-2 py-0.5 rounded-full border border-indigo-700">2 bits = 1 Base</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(BASE_MAPPINGS).map(([bits, info]) => (
                <div
                  key={bits}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl border text-xs font-mono font-bold ${info.bgColor}`}
                >
                  <span className="text-white">{bits}</span>
                  <span className="text-slate-400">→</span>
                  <span className="text-base font-black">{info.base}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Molecular & Binary Visualizer */}
        <div className="lg:col-span-2 space-y-4">
          {/* Key Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border-2 border-slate-800 hover:border-cyan-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Bits</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black font-mono text-cyan-400">
                  {encodedData.bitCount}
                </span>
                <span className="text-xs text-slate-500 font-bold">bits</span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-emerald-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">DNA Bases</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-black font-mono text-emerald-400">
                  {encodedData.baseCount}
                </span>
                <span className="text-xs text-slate-500 font-bold">nucleotides</span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-amber-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">GC Content</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span
                  className={`text-2xl font-black font-mono ${
                    encodedData.gcContent >= 40 && encodedData.gcContent <= 60
                      ? 'text-emerald-400'
                      : 'text-amber-400'
                  }`}
                >
                  {encodedData.gcContent}%
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                  {encodedData.gcContent >= 40 && encodedData.gcContent <= 60 ? 'Ideal' : 'Imbalanced'}
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-rose-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Homopolymer</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span
                  className={`text-2xl font-black font-mono ${
                    encodedData.longestHomopolymer.length <= 2 ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {encodedData.longestHomopolymer.length}
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  {encodedData.longestHomopolymer.base || 'None'}
                </span>
              </div>
            </div>
          </div>

          {/* Binary Strand Card */}
          <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 space-y-2.5 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <Binary className="w-4 h-4 text-cyan-400" />
                <span className="font-bold uppercase tracking-wider text-slate-200">Binary Bitstream (UTF-8)</span>
              </div>
              <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-950/60 px-2.5 py-0.5 rounded-full border border-cyan-500/30">{binaryBytes.length} bytes</span>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 overflow-x-auto">
              <div className="flex flex-wrap gap-2 font-mono text-xs text-cyan-300">
                {binaryBytes.map((byte, bIdx) => (
                  <span
                    key={bIdx}
                    className="px-2.5 py-1.5 bg-slate-900 rounded-xl border border-slate-800 tracking-wider hover:border-cyan-400 hover:text-white transition cursor-default font-bold"
                    title={`Character '${encodedData.originalText[bIdx] || ''}' -> ${byte}`}
                  >
                    {byte}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* DNA Strand Sequence Visualizer */}
          <div className="bg-slate-900 border-2 border-indigo-500 rounded-3xl p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Dna className="w-4 h-4 text-indigo-400" />
                <span className="font-bold uppercase tracking-wider text-indigo-300">DNA Sequence (Encoded) (5' → 3')</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs font-bold">
                <span className="text-cyan-400">A: {encodedData.baseCounts.A}</span>
                <span className="text-amber-400">C: {encodedData.baseCounts.C}</span>
                <span className="text-emerald-400">G: {encodedData.baseCounts.G}</span>
                <span className="text-rose-400">T: {encodedData.baseCounts.T}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/60 overflow-x-auto">
              <div className="flex flex-wrap gap-2 font-mono">
                {encodedData.dnaSequence.split('').map((base, idx) => {
                  const b = base as DnaBase;
                  const color = BASE_COLORS[b] || BASE_COLORS.A;
                  const isHovered = hoveredBaseIdx === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setHoveredBaseIdx(idx)}
                      onMouseLeave={() => setHoveredBaseIdx(null)}
                      className={`w-8 h-9 rounded-xl flex flex-col items-center justify-center border-2 font-black text-xs transition-all cursor-default select-none shadow-sm ${color.badge} ${
                        isHovered ? 'scale-115 shadow-lg ring-2 ring-white z-10' : ''
                      }`}
                      title={`Base #${idx + 1}: ${b} (Bits: ${BASE_MAPPINGS[Object.keys(BASE_MAPPINGS).find((k) => BASE_MAPPINGS[k].base === b) || '00']?.bits})`}
                    >
                      <span className="text-sm">{b}</span>
                      <span className="text-[8px] opacity-75 leading-none">{idx + 1}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-xs text-slate-300 flex items-center gap-2">
              <Info className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>
                Hover over nucleotides to see index numbers. Notice that raw text might create homopolymers or unbalanced GC ratios — which is why we need <strong className="text-emerald-400 font-bold">Genetic Algorithm Evolution</strong> next!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
