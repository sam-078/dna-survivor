import React, { useState, useEffect } from 'react';
import { Chromosome, GAParameters, GenerationHistoryPoint, DnaBase } from '../types';
import { BASE_COLORS } from '../utils/dnaEncoding';
import {
  Play,
  Pause,
  FastForward,
  RotateCcw,
  Sparkles,
  Award,
  ArrowRight,
  TrendingUp,
  Dna,
  CheckCircle,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface EvolveStepProps {
  population: Chromosome[];
  currentGeneration: number;
  history: GenerationHistoryPoint[];
  gaParams: GAParameters;
  onStepGeneration: () => void;
  onAutoEvolve: (generations: number) => void;
  onResetPopulation: () => void;
  onProceedToDamage: () => void;
}

export const EvolveStep: React.FC<EvolveStepProps> = ({
  population,
  currentGeneration,
  history,
  gaParams,
  onStepGeneration,
  onAutoEvolve,
  onResetPopulation,
  onProceedToDamage,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(300); // ms per gen

  const bestIndividual = population[0];

  // Auto-play loop
  useEffect(() => {
    let timer: any;
    if (isPlaying && currentGeneration < gaParams.maxGenerations) {
      timer = setTimeout(() => {
        onStepGeneration();
      }, playbackSpeed);
    } else if (currentGeneration >= gaParams.maxGenerations) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentGeneration, gaParams.maxGenerations, playbackSpeed, onStepGeneration]);

  const handleEvolveAll = () => {
    setIsPlaying(false);
    onAutoEvolve(gaParams.maxGenerations - currentGeneration);
  };

  return (
    <div className="space-y-6" id="step-evolve-container">
      {/* Step Banner */}
      <div className="bg-slate-900 border-2 border-emerald-500 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Dna className="w-4 h-4 text-emerald-400" />
              <span>Step 2: Natural Selection & Optimization</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Evolve Candidate DNA Sequences for Maximum Durability
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Real DNA synthesis fails if sequences have unbalanced GC content or long repetitive homopolymers (e.g. AAAA). Our Genetic Algorithm simulates biological evolution to breed optimal storage sequences!
            </p>
          </div>

          <button
            id="evolve-proceed-btn"
            onClick={onProceedToDamage}
            className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-rose-500 hover:bg-rose-400 text-slate-950 font-black text-xs sm:text-sm uppercase shadow-[0_4px_0_#e11d48] active:translate-y-1 active:shadow-none transition cursor-pointer flex-shrink-0"
          >
            <span>Test DNA Damage</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Evolution Dashboard Controls */}
      <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl p-5 sm:p-6 shadow-xl space-y-5">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Generation & Fitness Stat Badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-inner">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gen</span>
              <span className="text-2xl font-mono font-black text-cyan-400">
                {currentGeneration}
                <span className="text-xs text-slate-500 font-bold">/{gaParams.maxGenerations}</span>
              </span>
            </div>

            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-3 shadow-inner">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Fitness</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-black text-emerald-400">
                  {bestIndividual?.fitness || 0}%
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/40 font-black uppercase">
                  {bestIndividual?.fitness >= 90 ? 'Optimal' : bestIndividual?.fitness >= 70 ? 'Viable' : 'Suboptimal'}
                </span>
              </div>
            </div>

            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-3 hidden sm:flex shadow-inner">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">GC Balance</span>
              <span className="text-xl font-mono font-black text-amber-300">
                {bestIndividual?.gcContent}%
              </span>
            </div>

            <div className="bg-slate-950 border-2 border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-3 hidden sm:flex shadow-inner">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Max Repeat</span>
              <span className="text-xl font-mono font-black text-rose-300">
                {bestIndividual?.longestHomopolymerLength} bp
              </span>
            </div>
          </div>

          {/* Interactive Button Controls */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              id="evolve-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={currentGeneration >= gaParams.maxGenerations}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl font-black text-xs uppercase shadow transition cursor-pointer ${
                isPlaying
                  ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_3px_0_#d97706]'
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-[0_3px_0_#0891b2] disabled:opacity-40 disabled:cursor-not-allowed'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Auto Step'}</span>
            </button>

            <button
              id="evolve-single-step-btn"
              onClick={onStepGeneration}
              disabled={isPlaying || currentGeneration >= gaParams.maxGenerations}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-black text-xs uppercase transition cursor-pointer disabled:opacity-40"
            >
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Step +1 Gen</span>
            </button>

            <button
              id="evolve-instant-max-btn"
              onClick={handleEvolveAll}
              disabled={currentGeneration >= gaParams.maxGenerations}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition cursor-pointer disabled:opacity-40"
            >
              <FastForward className="w-4 h-4" />
              <span>EVOLVE TO GEN {gaParams.maxGenerations}!</span>
            </button>

            <button
              id="evolve-reset-btn"
              onClick={() => {
                setIsPlaying(false);
                onResetPopulation();
              }}
              className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Reset population back to Gen 1"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 3 Core Genetic Algorithm Principle Explainer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-md">
              1
            </div>
            <div>
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">🎯 Selection</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">
                Tournament selection favors DNA sequences with 50% GC balance and low repetition.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-sm flex-shrink-0 shadow-md">
              2
            </div>
            <div>
              <span className="text-xs font-black text-cyan-300 uppercase tracking-wider block">🔀 Crossover (75%)</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">
                Parent scrambler seeds splice and combine properties to inherit resilient structural traits.
              </p>
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500 text-white flex items-center justify-center font-black text-sm flex-shrink-0 shadow-md">
              3
            </div>
            <div>
              <span className="text-xs font-black text-purple-300 uppercase tracking-wider block">⚡ Mutation (15%)</span>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-1 font-medium">
                Random gene flips inject novelty and prevent getting trapped in local suboptimal traps.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Best Individual Highlight Card */}
      {bestIndividual && (
        <div className="bg-slate-900 border-2 border-emerald-400 rounded-3xl p-5 sm:p-6 shadow-2xl space-y-4 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold shadow-lg">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-emerald-400">
                  Best Candidate (Alpha Chromosome)
                </span>
                <div className="text-sm font-mono text-slate-200 font-bold">
                  Seed #{bestIndividual.keySeed} • Gen {bestIndividual.generation}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Fitness Score</span>
                <span className="text-3xl font-black font-mono text-emerald-400">
                  {bestIndividual.fitness}%
                </span>
              </div>
            </div>
          </div>

          {/* DNA Strand Display */}
          <div className="bg-slate-950 rounded-2xl p-4 border border-emerald-900/60 overflow-x-auto">
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {bestIndividual.dnaSequence.split('').map((base, idx) => {
                const b = base as DnaBase;
                const color = BASE_COLORS[b] || BASE_COLORS.A;
                return (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded-lg font-black border-2 text-xs shadow-sm ${color.badge}`}
                    title={`Base ${idx + 1}: ${b}`}
                  >
                    {b}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-4 flex-wrap">
              <span>GC Content: <strong className="text-white font-mono">{bestIndividual.gcContent}%</strong></span>
              <span>Longest Run: <strong className="text-white font-mono">{bestIndividual.longestHomopolymerLength} bases</strong></span>
              <span>GC Penalty: <strong className="text-amber-300 font-mono">-{bestIndividual.gcPenalty}</strong></span>
              <span>Homopolymer Penalty: <strong className="text-rose-300 font-mono">-{bestIndividual.homopolymerPenalty}</strong></span>
            </div>
            <span className="text-emerald-400 font-bold text-xs bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
              Ready for biological storage damage test
            </span>
          </div>
        </div>
      )}

      {/* Population Pool Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 flex items-center gap-2">
            <span>Candidate Population Pool</span>
            <span className="text-xs font-mono text-slate-500 font-normal">
              ({population.length} chromosomes ranked by fitness)
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {population.map((chr, idx) => {
            const isTop = idx === 0;
            return (
              <div
                key={chr.id}
                className={`p-4 rounded-2xl border-2 transition-all duration-200 shadow-md ${
                  isTop
                    ? 'bg-slate-900 border-emerald-400 shadow-emerald-950/40'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-mono text-xs font-black ${
                        isTop ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <span className="text-xs font-mono text-slate-200 font-bold truncate max-w-[90px]">
                      {chr.keySeed === 0 ? 'Raw Baseline' : `Seed ${chr.keySeed}`}
                    </span>
                  </div>
                  <span
                    className={`font-mono text-xs font-black ${
                      chr.fitness >= 85
                        ? 'text-emerald-400'
                        : chr.fitness >= 60
                        ? 'text-cyan-400'
                        : 'text-amber-400'
                    }`}
                  >
                    {chr.fitness}%
                  </span>
                </div>

                {/* Mini DNA snippet */}
                <div className="bg-slate-950 rounded-xl p-2 font-mono text-[10px] text-slate-300 tracking-wider truncate border border-slate-800 mb-2">
                  {chr.dnaSequence.slice(0, 18)}...
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono font-bold">
                  <span>GC: {chr.gcContent}%</span>
                  <span>Repeat: {chr.longestHomopolymerLength}bp</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
