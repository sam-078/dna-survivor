import React from 'react';
import { ComparisonResult } from '../types';
import {
  Swords,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  ShieldCheck,
  RotateCw,
  Award,
  Zap,
  Dna,
} from 'lucide-react';

interface ComparisonStepProps {
  comparison: ComparisonResult;
  onRunComparison: () => void;
  onProceedToResearch: () => void;
}

export const ComparisonStep: React.FC<ComparisonStepProps> = ({
  comparison,
  onRunComparison,
  onProceedToResearch,
}) => {
  const { raw, ga } = comparison;

  const recoveryDiff = ga.recoveryPercentage - raw.recoveryPercentage;

  return (
    <div className="space-y-6" id="step-compare-container">
      {/* Banner */}
      <div className="bg-slate-900 border-2 border-amber-400 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Swords className="w-4 h-4 text-amber-400" />
              <span>Step 5: Head-to-Head Benchmark Battle</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Raw Baseline vs GA-Optimized DNA Encoding
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Subject both candidate encodings to identical simulated noise ({raw.errorRate}% error rate) to measure how genetic evolution enhances real biochemical survivability.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              id="rerun-comparison-btn"
              onClick={onRunComparison}
              className="flex items-center gap-2 px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs border border-slate-700 transition cursor-pointer shadow-sm"
            >
              <RotateCw className="w-4 h-4 text-amber-400" />
              <span>Re-run Battle</span>
            </button>

            <button
              id="compare-proceed-btn"
              onClick={onProceedToResearch}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm uppercase shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition cursor-pointer flex-shrink-0"
            >
              <span>View Research Graph</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Outcome Verdict Banner */}
      <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-lg font-bold">
            <Award className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-black text-white">
                {recoveryDiff >= 0
                  ? '🧬 GA-Optimized DNA Outperforms Raw Baseline!'
                  : '⚔️ High Noise Stressed Both Sequences'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 font-medium leading-relaxed">
              GA optimization eliminated dangerous homopolymers, reducing synthesis slip errors by{' '}
              <strong className="text-emerald-400 font-bold font-mono">
                {Math.max(0, raw.homopolymerLen - ga.homopolymerLen)} bases
              </strong>{' '}
              and boosting recovery accuracy by{' '}
              <strong className="text-emerald-400 font-bold font-mono">
                {recoveryDiff > 0 ? `+${recoveryDiff.toFixed(1)}%` : `${recoveryDiff.toFixed(1)}%`}
              </strong>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-950 px-5 py-3 rounded-2xl border border-slate-800 shadow-inner">
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Raw Recovery</span>
            <div className="text-xl font-mono font-black text-rose-400">{raw.recoveryPercentage}%</div>
          </div>
          <span className="text-slate-600 font-black text-sm">vs</span>
          <div className="text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">GA Recovery</span>
            <div className="text-xl font-mono font-black text-emerald-400">{ga.recoveryPercentage}%</div>
          </div>
        </div>
      </div>

      {/* Side-by-Side Head-to-Head Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card A: Raw Baseline */}
        <div className="bg-slate-900 border-2 border-slate-800 hover:border-slate-700 rounded-3xl p-6 space-y-5 relative shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500 text-slate-950 flex items-center justify-center font-black text-sm shadow">
                A
              </div>
              <div>
                <h3 className="text-base font-black text-slate-200">Raw / Standard DNA</h3>
                <span className="text-xs text-slate-400 font-mono">Seed 0 (Un-optimized Baseline)</span>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-bold">
              Baseline
            </span>
          </div>

          {/* Metric Rows with Visual Progress Bars */}
          <div className="space-y-4 text-xs font-medium">
            {/* Fitness */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400 font-bold uppercase tracking-wider text-[11px]">Biological Fitness:</span>
                <span className="font-mono font-black text-rose-400">{raw.fitness}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-rose-500 rounded-full transition-all duration-500"
                  style={{ width: `${raw.fitness}%` }}
                />
              </div>
            </div>

            {/* GC Balance */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">GC Content:</span>
              <span className="font-mono text-slate-200 font-bold">{raw.gcContent}% (Ideal: 50%)</span>
            </div>

            {/* Max Homopolymer */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Longest Homopolymer Run:</span>
              <span className="font-mono text-rose-400 font-bold">{raw.homopolymerLen} consecutive bases</span>
            </div>

            {/* Errors Generated */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Errors Incurred (Noise {raw.errorRate}%):</span>
              <span className="font-mono text-rose-400 font-bold">{raw.errorsIntroduced} mutations</span>
            </div>

            {/* Recovery Percentage */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between">
                <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">Final Data Recovery:</span>
                <span className="font-mono font-black text-lg text-rose-400">{raw.recoveryPercentage}%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-rose-600 to-amber-500 rounded-full transition-all duration-500"
                  style={{ width: `${raw.recoveryPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Decoded Output */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-1 shadow-inner">
            <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Decoded Output:</span>
            <div className="font-mono text-sm text-slate-200 font-bold break-all">
              {raw.recoveredText || '—'}
            </div>
          </div>
        </div>

        {/* Card B: GA Optimized */}
        <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-6 space-y-5 relative shadow-xl shadow-emerald-950/20">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm shadow">
                B
              </div>
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-1.5">
                  <span>GA-Optimized DNA</span>
                  <Award className="w-4 h-4 text-emerald-400" />
                </h3>
                <span className="text-xs text-emerald-400 font-mono font-semibold">Evolved with Crossover & Selection</span>
              </div>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500 font-black uppercase tracking-wider">
              Evolution Winner
            </span>
          </div>

          {/* Metric Rows with Visual Progress Bars */}
          <div className="space-y-4 text-xs font-medium">
            {/* Fitness */}
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">Biological Fitness:</span>
                <span className="font-mono font-black text-emerald-400">{ga.fitness}%</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${ga.fitness}%` }}
                />
              </div>
            </div>

            {/* GC Balance */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">GC Content:</span>
              <span className="font-mono text-emerald-400 font-bold">{ga.gcContent}% (Optimally Balanced)</span>
            </div>

            {/* Max Homopolymer */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Longest Homopolymer Run:</span>
              <span className="font-mono text-emerald-400 font-bold">{ga.homopolymerLen} consecutive bases (Minimized)</span>
            </div>

            {/* Errors Generated */}
            <div className="flex justify-between py-1.5 border-b border-slate-800/60">
              <span className="text-slate-400">Errors Incurred (Noise {ga.errorRate}%):</span>
              <span className="font-mono text-emerald-400 font-bold">{ga.errorsIntroduced} mutations</span>
            </div>

            {/* Recovery Percentage */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between">
                <span className="text-white font-bold uppercase tracking-wider text-[11px]">Final Data Recovery:</span>
                <span className="font-mono font-black text-lg text-emerald-400">{ga.recoveryPercentage}%</span>
              </div>
              <div className="w-full h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                  style={{ width: `${ga.recoveryPercentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* Decoded Output */}
          <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-900/60 text-xs space-y-1 shadow-inner">
            <span className="text-[10px] text-emerald-400 uppercase font-mono font-bold">Decoded Output:</span>
            <div className="font-mono text-sm text-emerald-300 font-bold break-all">
              {ga.recoveredText || '—'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
