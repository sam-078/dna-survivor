import React, { useEffect } from 'react';
import { RecoveryReport, RecoveryStatus } from '../types';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Cpu,
  Layers,
} from 'lucide-react';

interface RecoverStepProps {
  recoveryReport: RecoveryReport;
  errorRate: number;
  onRerunRecovery: () => void;
  onProceedToCompare: () => void;
}

export const RecoverStep: React.FC<RecoverStepProps> = ({
  recoveryReport,
  errorRate,
  onRerunRecovery,
  onProceedToCompare,
}) => {
  // Fire confetti if 100% recovered
  useEffect(() => {
    if (recoveryReport.status === 'recovered') {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    }
  }, [recoveryReport.status]);

  const getStatusBadge = (status: RecoveryStatus) => {
    switch (status) {
      case 'recovered':
        return {
          label: 'DATA RECOVERED',
          icon: CheckCircle2,
          containerClass: 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500/30',
          iconColor: 'text-emerald-400',
          subtext: '100% of information successfully reconstructed!',
        };
      case 'partial':
        return {
          label: 'PARTIALLY RECOVERED',
          icon: AlertTriangle,
          containerClass: 'bg-amber-950/80 border-amber-500 text-amber-300 ring-2 ring-amber-500/30',
          iconColor: 'text-amber-400',
          subtext: 'Some characters were damaged beyond repair threshold.',
        };
      case 'lost':
        return {
          label: 'DATA LOST',
          icon: XCircle,
          containerClass: 'bg-rose-950/80 border-rose-500 text-rose-300 ring-2 ring-rose-500/30',
          iconColor: 'text-rose-400',
          subtext: 'Error rate overwhelmed simulated error-correction bounds.',
        };
    }
  };

  const statusMeta = getStatusBadge(recoveryReport.status);
  const StatusIcon = statusMeta.icon;

  return (
    <div className="space-y-6" id="step-recover-container">
      {/* Step Banner */}
      <div className="bg-slate-900 border-2 border-purple-500 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Step 4: Error Correction & Message Recovery</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Reconstructing Original Data from Degraded DNA
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Using multi-strand majority voting and parity consensus, the recovery engine cross-references noisy reads to restore lost digital bits.
            </p>
          </div>

          <button
            id="recover-proceed-btn"
            onClick={onProceedToCompare}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm uppercase shadow-[0_4px_0_#d97706] active:translate-y-1 active:shadow-none transition cursor-pointer flex-shrink-0"
          >
            <span>Proceed to Comparison</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Status Hero Card */}
      <div
        className={`rounded-3xl p-6 border-2 shadow-2xl transition-all duration-300 ${statusMeta.containerClass}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-black/40 border border-current flex items-center justify-center flex-shrink-0 shadow-lg">
              <StatusIcon className={`w-8 h-8 ${statusMeta.iconColor}`} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
                  {statusMeta.label}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-black/50 border border-current font-black font-mono">
                  {recoveryReport.recoveryPercentage}% MATCH
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-90 mt-1 font-medium">{statusMeta.subtext}</p>
            </div>
          </div>

          <button
            id="rerun-recovery-btn"
            onClick={onRerunRecovery}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/40 hover:bg-black/60 border border-current text-xs font-black uppercase transition cursor-pointer flex-shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Re-verify Read</span>
          </button>
        </div>
      </div>

      {/* Message Reconstruction Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Original Text */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 space-y-3 shadow-lg">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
            Original Input Message
          </span>
          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-lg font-bold text-white break-all min-h-[64px] flex items-center shadow-inner">
            {recoveryReport.originalText || '—'}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Golden reference string</span>
        </div>

        {/* 2. Raw Damaged Decode (Before Error Correction) */}
        <div className="bg-slate-900 border-2 border-rose-500/60 rounded-3xl p-5 space-y-3 shadow-lg">
          <span className="text-xs font-bold text-rose-400 uppercase tracking-widest block">
            Raw Decode (Without Error Correction)
          </span>
          <div className="p-4 bg-slate-950 rounded-2xl border border-rose-900/60 font-mono text-lg font-bold text-rose-300 break-all min-h-[64px] flex items-center shadow-inner">
            {recoveryReport.rawDamagedDecodedText || '—'}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Unfiltered corrupted single read</span>
        </div>

        {/* 3. Corrected Recovered Output */}
        <div className="bg-slate-900 border-2 border-emerald-500/60 rounded-3xl p-5 space-y-3 shadow-lg">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">
            Final Recovered Output (After Parity Voting)
          </span>
          <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-900/60 font-mono text-lg font-bold text-emerald-300 break-all min-h-[64px] flex items-center shadow-inner">
            {recoveryReport.correctedText || '—'}
          </div>
          <span className="text-[11px] text-slate-500 font-medium">Consensus majority reconstruction</span>
        </div>
      </div>

      {/* Character Breakdown & Diff Table */}
      <div className="bg-slate-900 border-2 border-purple-500/80 rounded-3xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Character-by-Character Recovery Inspector</span>
          </h3>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Exact Match
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Repaired by Parity
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" /> Corrupted
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2.5">
          {recoveryReport.charDiffs.map((diff) => (
            <div
              key={diff.index}
              className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center font-mono shadow-md ${
                diff.isMatch
                  ? diff.wasRepaired
                    ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                    : 'bg-emerald-950/60 border-emerald-400 text-emerald-300'
                  : 'bg-rose-950/60 border-rose-500 text-rose-300'
              }`}
            >
              <span className="text-[10px] text-slate-400 mb-1 font-bold">#{diff.index + 1}</span>
              <span className="text-2xl font-black">{diff.correctedChar}</span>
              <span className="text-[10px] mt-1 opacity-70 font-semibold">
                Orig: {diff.originalChar}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer note */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <span className="leading-relaxed">
            <strong className="text-slate-300">Educational Simplified Model:</strong> This demonstration implements simulated multi-strand physical sequencing majority voting and parity consensus. Real industrial DNA storage uses Reed-Solomon, LDPC, and DNA Fountain droplet codes.
          </span>
        </div>
      </div>
    </div>
  );
};
