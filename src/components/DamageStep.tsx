import React, { useState } from 'react';
import { DamageReport, NoiseType, DnaBase, Chromosome } from '../types';
import { BASE_COLORS } from '../utils/dnaEncoding';
import {
  Flame,
  ArrowRight,
  RotateCw,
  AlertTriangle,
  Zap,
  Info,
  Bug,
  Split,
  Trash2,
} from 'lucide-react';

interface DamageStepProps {
  currentChromosome: Chromosome;
  damageReport: DamageReport;
  errorRate: number;
  noiseType: NoiseType;
  onChangeErrorRate: (rate: number) => void;
  onChangeNoiseType: (type: NoiseType) => void;
  onReapplyDamage: () => void;
  onProceedToRecover: () => void;
}

const ERROR_RATE_PRESETS = [0, 1, 3, 5, 8, 10, 15];

export const DamageStep: React.FC<DamageStepProps> = ({
  currentChromosome,
  damageReport,
  errorRate,
  noiseType,
  onChangeErrorRate,
  onChangeNoiseType,
  onReapplyDamage,
  onProceedToRecover,
}) => {
  const [selectedBaseIndex, setSelectedBaseIndex] = useState<number | null>(null);

  const selectedBaseInfo =
    selectedBaseIndex !== null
      ? damageReport.damagedBases.find((b) => b.originalIndex === selectedBaseIndex)
      : null;

  return (
    <div className="space-y-6" id="step-damage-container">
      {/* Step Header */}
      <div className="bg-slate-900 border-2 border-rose-500 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Flame className="w-4 h-4 text-rose-400" />
              <span>Step 3: Simulated Biological Storage Noise</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Inject Artificial Physical Degradation & Sequencing Errors
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              DNA in storage experiences environmental entropy (radiation, chemical hydrolytic deamination, enzyme synthesis noise). Adjust the slider to see how errors mutate nucleotides.
            </p>
          </div>

          <button
            id="damage-proceed-btn"
            onClick={onProceedToRecover}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-purple-500 hover:bg-purple-400 text-white font-black text-xs sm:text-sm uppercase shadow-[0_4px_0_#7c3aed] active:translate-y-1 active:shadow-none transition cursor-pointer flex-shrink-0"
          >
            <span>Proceed to Recovery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Noise Controls & Metrics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Sliders & Error Config */}
        <div className="lg:col-span-1 bg-slate-900 border-2 border-rose-500 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
          {/* Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-rose-400" />
                <span>Error Rate Slider</span>
              </label>
              <span className="text-2xl font-mono font-black text-rose-400">
                {errorRate}%
              </span>
            </div>

            <input
              id="error-rate-slider"
              type="range"
              min={0}
              max={15}
              step={1}
              value={errorRate}
              onChange={(e) => onChangeErrorRate(parseInt(e.target.value, 10))}
              className="w-full h-2.5 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-rose-500"
            />

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {ERROR_RATE_PRESETS.map((preset) => (
                <button
                  key={preset}
                  id={`error-preset-${preset}`}
                  onClick={() => onChangeErrorRate(preset)}
                  className={`text-xs px-3 py-1 rounded-full border font-mono transition cursor-pointer font-bold ${
                    errorRate === preset
                      ? 'bg-rose-500 text-slate-950 border-rose-400 shadow-md shadow-rose-500/20'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {preset}%
                </button>
              ))}
            </div>
          </div>

          {/* Noise Type Filter */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Error Mechanism Type
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                id="noise-type-mixed"
                onClick={() => onChangeNoiseType('mixed')}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  noiseType === 'mixed'
                    ? 'bg-purple-950 border-purple-500 text-purple-200 ring-1 ring-purple-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>Mixed Real Bio</span>
              </button>

              <button
                id="noise-type-substitution"
                onClick={() => onChangeNoiseType('substitution')}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  noiseType === 'substitution'
                    ? 'bg-rose-950 border-rose-500 text-rose-200 ring-1 ring-rose-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                <span>Substitution</span>
              </button>

              <button
                id="noise-type-insertion"
                onClick={() => onChangeNoiseType('insertion')}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  noiseType === 'insertion'
                    ? 'bg-amber-950 border-amber-500 text-amber-200 ring-1 ring-amber-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Split className="w-3.5 h-3.5 text-amber-400" />
                <span>Insertion</span>
              </button>

              <button
                id="noise-type-deletion"
                onClick={() => onChangeNoiseType('deletion')}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                  noiseType === 'deletion'
                    ? 'bg-red-950 border-red-500 text-red-200 ring-1 ring-red-500'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" />
                <span>Deletion</span>
              </button>
            </div>
          </div>

          {/* Reapply button */}
          <button
            id="re-damage-btn"
            onClick={onReapplyDamage}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold text-xs border border-rose-500/50 transition cursor-pointer shadow-sm"
          >
            <RotateCw className="w-4 h-4 text-rose-400 animate-spin-reverse" />
            <span>Generate New Random Damage</span>
          </button>
        </div>

        {/* Right Column: Error Stats & Alignment Inspector */}
        <div className="lg:col-span-2 space-y-4">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900 border-2 border-slate-800 hover:border-rose-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Total Errors</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-mono text-rose-400">
                  {damageReport.totalErrors}
                </span>
                <span className="text-xs text-slate-500 font-bold">mutations</span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-amber-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Substitutions</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-mono text-amber-400">
                  {damageReport.errorCountSubstitutions}
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-purple-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Insert / Delete</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-mono text-purple-400">
                  {damageReport.errorCountInsertions + damageReport.errorCountDeletions}
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border-2 border-slate-800 hover:border-rose-500 rounded-2xl p-4 transition shadow-lg">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Affected Bases</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-black font-mono text-rose-400">
                  {damageReport.affectedBasesPercentage}%
                </span>
              </div>
            </div>
          </div>

          {/* DNA Alignment Comparison Display */}
          <div className="bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-300 flex-wrap gap-2">
              <span className="font-bold uppercase tracking-wider text-rose-300">
                Molecular Sequence Alignment
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                Click any base to inspect error details
              </span>
            </div>

            {/* Visual alignment tracks */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-rose-900/40 overflow-x-auto">
              {/* Row 1: Original DNA */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 tracking-wider block mb-1">
                  ORIGINAL DNA (5' → 3')
                </span>
                <div className="flex flex-wrap gap-1 font-mono text-xs">
                  {damageReport.damagedBases.map((b, idx) => (
                    <span
                      key={idx}
                      onClick={() => setSelectedBaseIndex(b.originalIndex)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg font-bold border cursor-pointer select-none transition ${
                        b.isError
                          ? 'bg-rose-950/40 border-rose-700/60 text-rose-300 ring-1 ring-rose-500/40'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {b.originalBase}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 2: Error Indicator Markers */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-rose-400 tracking-wider block mb-1">
                  MUTATION FLAGS
                </span>
                <div className="flex flex-wrap gap-1 font-mono text-xs">
                  {damageReport.damagedBases.map((b, idx) => (
                    <span
                      key={idx}
                      className="w-7 h-5 flex items-center justify-center font-bold text-xs select-none"
                    >
                      {b.isError ? (
                        <span className="text-rose-400 animate-bounce font-black">↑</span>
                      ) : (
                        <span className="text-slate-700 text-[10px]">·</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>

              {/* Row 3: Damaged DNA */}
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-rose-300 tracking-wider block mb-1">
                  DAMAGED DNA (Noise Injected)
                </span>
                <div className="flex flex-wrap gap-1 font-mono text-xs">
                  {damageReport.damagedBases.map((b, idx) => (
                    <span
                      key={idx}
                      onClick={() => setSelectedBaseIndex(b.originalIndex)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg font-black border-2 cursor-pointer select-none transition ${
                        b.isError
                          ? 'bg-rose-500 text-slate-950 border-rose-300 shadow-md shadow-rose-950 scale-110 z-10'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      {b.damagedBase}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Base Inspector Card */}
            {selectedBaseInfo && selectedBaseInfo.isError ? (
              <div className="bg-rose-950/60 border border-rose-800/80 rounded-2xl p-4 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-slate-950 font-mono font-black flex items-center justify-center shadow">
                    !
                  </div>
                  <div>
                    <span className="font-bold text-rose-300 block">
                      Base Position #{selectedBaseInfo.originalIndex + 1} Mutated
                    </span>
                    <span className="text-slate-300 font-mono">
                      Original: <strong className="text-white">{selectedBaseInfo.originalBase}</strong> → Corrupted to: <strong className="text-rose-400">{selectedBaseInfo.damagedBase}</strong> ({selectedBaseInfo.errorType})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBaseIndex(null)}
                  className="text-xs text-slate-400 hover:text-white px-2 py-1 cursor-pointer font-bold"
                >
                  Dismiss
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-300 flex items-center gap-2 font-medium">
                <Info className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span>
                  Red arrows indicate mutated positions. Next, we will run the <strong className="text-purple-300 font-bold">Error Correction Engine</strong> to see if your message survives!
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
