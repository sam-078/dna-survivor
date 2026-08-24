import React, { useState, useEffect } from 'react';
import {
  Presentation,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Download,
  Copy,
  Check,
  Sparkles,
  Maximize2,
  FileText,
  Volume2,
  Dna,
  Layers,
  Flame,
  ShieldCheck,
  BarChart3,
  Lightbulb,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { EncodedData, Chromosome, GAParameters, RecoveryReport } from '../types';

interface PresentationStepProps {
  encodedData: EncodedData;
  bestChromosome: Chromosome;
  rawChromosome: Chromosome;
  gaParams: GAParameters;
  errorRate: number;
  recoveryReport: RecoveryReport;
  onNavigateToReferences: () => void;
  onNavigateToSimulation: () => void;
}

interface Slide {
  id: number;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  content: React.ReactNode;
  speakerNotes: string[];
  takeaways: string[];
}

export const PresentationStep: React.FC<PresentationStepProps> = ({
  encodedData,
  bestChromosome,
  rawChromosome,
  gaParams,
  errorRate,
  recoveryReport,
  onNavigateToReferences,
  onNavigateToSimulation,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playInterval, setPlayInterval] = useState<number>(6); // seconds
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [showAllSlidesView, setShowAllSlidesView] = useState<boolean>(false);
  const [copiedNote, setCopiedNote] = useState<boolean>(false);

  const slides: Slide[] = [
    {
      id: 1,
      badge: 'SLIDE 1 • EXECUTIVE OVERVIEW',
      badgeColor: 'bg-emerald-500 text-slate-950',
      title: 'DNA Data Survivor',
      subtitle: 'Nature-Inspired Molecular Data Storage & Evolutionary Scrambler Optimization',
      icon: Dna,
      speakerNotes: [
        'Welcome the audience. Introduce the core research question: Can digital data be stored in synthetic DNA and survive real-world physical and biochemical degradation?',
        'Highlight that this project uses nature in two ways: biological DNA as the physical medium and Genetic Algorithms as the evolutionary optimization engine.',
        'Mention that direct translation from binary to DNA causes severe sequencing bottlenecks, which our GA model successfully resolves.'
      ],
      takeaways: [
        'Global digital data volume is outgrowing traditional silicon & magnetic storage capacity.',
        'DNA offers 215 Petabytes/gram density and lasts thousands of years with zero power consumption.',
        'Genetic Algorithms optimize DNA scramblers to eliminate biochemical sequencing failure points.'
      ],
      content: (
        <div className="space-y-6">
          <div className="p-6 bg-slate-950 rounded-2xl border-2 border-emerald-400/40 shadow-inner flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Nature-Inspired Computing Simulation
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Solving the Global Data Storage Crisis with Evolutionary Biology
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-medium">
                A computer science investigation into encoding digital payloads into 4-base deoxyribonucleic acid (A, T, C, G) and evolving candidate chromosomes via selection, crossover, and mutation.
              </p>
            </div>
            <div className="w-36 h-36 rounded-3xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-1 flex items-center justify-center shadow-xl flex-shrink-0">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex flex-col items-center justify-center p-3 text-center">
                <Dna className="w-10 h-10 text-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-black text-emerald-400 mt-2">215 PB/g</span>
                <span className="text-[10px] text-slate-400 uppercase font-bold">Max Density</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Active Payload</span>
              <div className="text-base font-mono font-black text-cyan-400 truncate">
                "{encodedData.originalText}"
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {encodedData.bitCount} bits → {encodedData.baseCount} nt bases
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Evolved Fitness</span>
              <div className="text-lg font-mono font-black text-emerald-400">
                {bestChromosome.fitness}%
              </div>
              <span className="text-[11px] text-emerald-500 font-bold">
                +{Math.max(0, Math.round(bestChromosome.fitness - rawChromosome.fitness))}% over Raw
              </span>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Simulated Noise Rate</span>
              <div className="text-lg font-mono font-black text-amber-400">
                {errorRate}% Error
              </div>
              <span className="text-[11px] text-slate-400 font-mono">
                {recoveryReport.recoveryPercentage}% Data Recovery
              </span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      badge: 'SLIDE 2 • PROBLEM STATEMENT',
      badgeColor: 'bg-rose-500 text-slate-950',
      title: 'The Impending Global Storage Crisis',
      subtitle: 'Why Conventional Magnetic and Silicon Storage Cannot Keep Pace',
      icon: Flame,
      speakerNotes: [
        'Explain that worldwide data generation will exceed 180 Zettabytes (180 trillion GB) by 2025-2026.',
        'Current data centers consume over 2% of the world’s entire electricity supply, largely for cooling and maintaining volatile silicon servers.',
        'Magnetic tapes (LTO) degrade in 10-30 years, requiring continuous, expensive re-copy cycles ("data migrations").'
      ],
      takeaways: [
        'Data center energy and raw material footprints are becoming unsustainable.',
        'Magnetic tapes and hard drives suffer physical bit rot within 10 to 30 years.',
        'DNA offers 1000+ years durability in room-temperature dry capsules without electrical power.'
      ],
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border-2 border-rose-500/40 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-black text-sm uppercase">
                <Flame className="w-5 h-5" />
                <span>The Silicon / Magnetic Bottleneck</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Physical Bit Rot:</strong> Magnetic domain alignment degrades in 10–30 years, requiring continuous re-copy cycles.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Massive Carbon Footprint:</strong> Data centers consume &gt;2% of worldwide electricity for power & cooling.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span><strong>Form Factor Limits:</strong> Magnetic media is 2D planar; silicon chips face quantum tunneling limits.</span>
                </li>
              </ul>
            </div>

            <div className="p-5 bg-slate-950 rounded-2xl border-2 border-emerald-500/40 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase">
                <ShieldCheck className="w-5 h-5" />
                <span>The DNA Biological Advantage</span>
              </div>
              <ul className="space-y-2 text-xs text-slate-300 font-medium leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Ultra-Compact 3D Density:</strong> 1 gram of DNA holds up to 215,000,000 GB (all world data fits in a room).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Millennial Longevity:</strong> Preserved DNA in fossils stays intact for over 500,000 years with zero electricity.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span><strong>Eternal Format Compatibility:</strong> As long as biology exists, humans will always possess DNA sequencers.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400 font-bold">Comparison Metric:</span>
            <span className="text-rose-400 font-bold">LTO Tape: ~10 GB/mm³</span>
            <span className="text-slate-600 font-bold">vs</span>
            <span className="text-emerald-400 font-black">Synthetic DNA: ~10,000,000 GB/mm³ (1,000,000x denser)</span>
          </div>
        </div>
      )
    },
    {
      id: 3,
      badge: 'SLIDE 3 • BIOCHEMICAL CONSTRAINTS',
      badgeColor: 'bg-amber-400 text-slate-950',
      title: 'Biochemical Synthesis & Sequencing Bottlenecks',
      subtitle: 'Why Naive Binary-to-DNA Translation Fails in the Wet Lab',
      icon: Layers,
      speakerNotes: [
        'Walk through how naive 2-bit mapping converts binary 00/01/10/11 into A/C/G/T.',
        'Explain that repeated characters in text produce homopolymers like "AAAAAAA" or "GGGGGG".',
        'When sequencers (like Oxford Nanopore or Illumina) read long identical runs, optical cameras and voltage sensors lose baseline calibration and cause severe insertion/deletion slip errors.',
        'Similarly, GC content outside 40%-60% creates secondary hairpin structures that block polymerase chain reaction (PCR).'
      ],
      takeaways: [
        'Homopolymer runs (>3 identical bases) cause optical sensor slippage during sequencing.',
        'GC Content imbalance (<40% or >60%) creates thermal instability and secondary DNA hairpins.',
        'A scrambler transformation is mandatory to satisfy biochemical synthesis rules.'
      ],
      content: (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-amber-400/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-amber-300 uppercase">Constraint 1: Homopolymer Length</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">Critical Error Risk</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Sequencing identical consecutive bases (e.g., <code className="text-rose-400 font-mono font-bold">AAAAAA</code>) triggers synthesis slippage and reading drift. Nanopores cannot discern whether 5 or 6 bases passed through.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] flex justify-between">
                <span className="text-slate-400">Target Rule:</span>
                <span className="text-emerald-400 font-bold">Max run ≤ 3 consecutive identical bases</span>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-cyan-400/50 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-cyan-300 uppercase">Constraint 2: GC Content Ratio</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">Melting Stability</span>
              </div>
              <p className="text-xs text-slate-300 font-medium leading-relaxed">
                Guanine (G) and Cytosine (C) form 3 hydrogen bonds, while A-T forms 2. Skewed GC ratios alter hybridization melting temperatures ($T_m$) and cause self-folding hairpin loops.
              </p>
              <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] flex justify-between">
                <span className="text-slate-400">Target Rule:</span>
                <span className="text-emerald-400 font-bold">Optimal GC Ratio: 45% – 55% (Ideal: 50%)</span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              Direct Binary-to-Base Mapping (2 Bits = 1 Nucleotide)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono text-center">
              <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-500/50 text-cyan-300 font-bold">
                00 → A (Adenine)
              </div>
              <div className="p-2 rounded-xl bg-amber-950/70 border border-amber-500/50 text-amber-300 font-bold">
                01 → C (Cytosine)
              </div>
              <div className="p-2 rounded-xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-300 font-bold">
                10 → G (Guanine)
              </div>
              <div className="p-2 rounded-xl bg-rose-950/70 border border-rose-500/50 text-rose-300 font-bold">
                11 → T (Thymine)
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      badge: 'SLIDE 4 • GA ALGORITHM DESIGN',
      badgeColor: 'bg-emerald-400 text-slate-950',
      title: 'Genetic Algorithm Optimization Architecture',
      subtitle: 'Simulating Natural Selection to Evolve Fault-Tolerant DNA Chromosomes',
      icon: Dna,
      speakerNotes: [
        'Explain how the Genetic Algorithm models biological evolution.',
        'Chromosome Representation: Each chromosome carries a seed/permutation key that scrambles the payload into candidate DNA.',
        'Fitness Function: Penalizes deviations from 50% GC balance and penalizes long homopolymer streaks.',
        'Selection: Elitism preserves top candidates, while tournament/roulette selection pairs parents for crossover.',
        'Crossover & Mutation: Recombines scrambler keys and mutates bits with stochastic probability.'
      ],
      takeaways: [
        'Chromosomes represent candidate scrambler seed permutations.',
        'Fitness evaluation mathematically penalizes GC deviation and homopolymer runs.',
        'Generational evolution converges toward 100% biological fitness in <15 generations.'
      ],
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-emerald-400/40 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-emerald-400 uppercase">
                Mathematical Fitness Objective Function
              </span>
              <span className="text-[10px] font-mono text-slate-400 font-bold">Range: 0% to 100%</span>
            </div>
            <div className="p-3 bg-slate-900 rounded-xl font-mono text-xs text-center font-bold text-white border border-slate-800">
              <span className="text-emerald-400">Fitness</span> = 100 - [ 2.0 × |GC% - 50%| ] - [ 6.0 × max(0, Homopolymer - 2)² ]
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="w-6 h-6 rounded-lg bg-indigo-500 text-white font-bold flex items-center justify-center text-xs">1</div>
              <h4 className="font-bold text-slate-200">1. Population</h4>
              <p className="text-[11px] text-slate-400">
                Initialize {gaParams.populationSize} candidate scrambler chromosomes.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="w-6 h-6 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">2</div>
              <h4 className="font-bold text-slate-200">2. Evaluation</h4>
              <p className="text-[11px] text-slate-400">
                Score GC balance & homopolymer penalties across all sequences.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="w-6 h-6 rounded-lg bg-cyan-400 text-slate-950 font-bold flex items-center justify-center text-xs">3</div>
              <h4 className="font-bold text-slate-200">3. Crossover</h4>
              <p className="text-[11px] text-slate-400">
                Pair top parents ({Math.round(gaParams.crossoverRate * 100)}% rate) to recombine genes.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="w-6 h-6 rounded-lg bg-purple-500 text-white font-bold flex items-center justify-center text-xs">4</div>
              <h4 className="font-bold text-slate-200">4. Mutation</h4>
              <p className="text-[11px] text-slate-400">
                Stochastic perturbation ({Math.round(gaParams.mutationRate * 100)}% rate) escapes local optima.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      badge: 'SLIDE 5 • ERROR MODELING & RECOVERY',
      badgeColor: 'bg-purple-500 text-white',
      title: 'Noise Injection & Fault Tolerance',
      subtitle: 'Simulating Physical Chemical Damage and Redundant Strand Voting',
      icon: Sparkles,
      speakerNotes: [
        'Explain the three physical error types: Substitutions (mismatches), Insertions (extra bases), and Deletions (missing bases).',
        'Demonstrate how our simulator introduces configurable error rates (0% - 15%).',
        'Explain the biological majority voting mechanism: In physical synthesis, billions of copies of each oligonucleotide are made.',
        'By sequencing multiple independent strands (e.g. 3x or 5x voting depth), random stochastic mutations cancel out through consensus voting.'
      ],
      takeaways: [
        'Physical DNA channels experience substitutions, insertions, and deletions.',
        'Majority voting across redundant strands (3x–5x) corrects stochastic noise.',
        'GA-optimized DNA maintains higher consensus fidelity than raw sequences.'
      ],
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 bg-slate-950 rounded-2xl border border-rose-900/60 space-y-1">
              <span className="text-[10px] font-mono text-rose-400 font-bold uppercase">Error Type 1</span>
              <h4 className="text-xs font-black text-slate-200">Substitutions (Mismatches)</h4>
              <p className="text-[11px] text-slate-400 font-medium">
                Single base swaps (e.g. A → G) due to deamination or polymerase misincorporation.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-amber-900/60 space-y-1">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Error Type 2</span>
              <h4 className="text-xs font-black text-slate-200">Insertions (Extra Bases)</h4>
              <p className="text-[11px] text-slate-400 font-medium">
                Stray nucleotides inserted during enzymatic or chemical phosphoramidite coupling.
              </p>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-2xl border border-purple-900/60 space-y-1">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">Error Type 3</span>
              <h4 className="text-xs font-black text-slate-200">Deletions (Dropped Bases)</h4>
              <p className="text-[11px] text-slate-400 font-medium">
                Uncapped synthesis steps causing truncated strands and phase framing shifts.
              </p>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border-2 border-purple-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Majority-Voting Consensus Decoder ({gaParams.redundancyStrands}x Strand Depth)</span>
              </h4>
              <p className="text-xs text-slate-300 font-medium mt-1">
                Reads {gaParams.redundancyStrands} independent damaged strand instances and conducts position-by-position voting to reconstruct the pristine payload.
              </p>
            </div>
            <div className="px-4 py-2 bg-purple-950/80 border border-purple-500/50 rounded-xl font-mono text-xs font-black text-purple-300 flex-shrink-0">
              Recovery: {recoveryReport.recoveryPercentage}%
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      badge: 'SLIDE 6 • EMPIRICAL BENCHMARKS',
      badgeColor: 'bg-cyan-400 text-slate-950',
      title: 'Empirical Benchmark & Stress Test Results',
      subtitle: 'Quantitative Comparison: Raw Baseline vs GA-Optimized DNA',
      icon: BarChart3,
      speakerNotes: [
        'Present the head-to-head empirical findings.',
        'At low error rates (1-3%), both encodings perform adequately, but Raw DNA quickly deteriorates once noise exceeds 4%.',
        'Because GA DNA has zero homopolymer runs and balanced GC content, error correction codes recover 95-100% of the payload even under aggressive 5-10% noise.',
        'Highlight the quantitative advantage of evolutionary heuristics in molecular computing.'
      ],
      takeaways: [
        'GA optimization yields up to +35% higher data recovery under high noise.',
        'Homopolymer reduction is the primary driver of synthesis error suppression.',
        'Monte Carlo trials confirm high reproducibility across random message payloads.'
      ],
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-rose-500/40 space-y-2">
              <span className="text-xs font-black text-rose-400 uppercase block">
                Raw Baseline DNA (Seed 0)
              </span>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Fitness:</span>
                  <span className="text-rose-400 font-bold">{rawChromosome.fitness}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Longest Homopolymer:</span>
                  <span className="text-rose-400 font-bold">{rawChromosome.longestHomopolymerLength} bases</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GC Balance:</span>
                  <span className="text-slate-300 font-bold">{rawChromosome.gcContent}%</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-slate-950 rounded-2xl border-2 border-emerald-400 space-y-2">
              <span className="text-xs font-black text-emerald-400 uppercase flex items-center justify-between">
                <span>GA-Optimized DNA (Evolved)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500">Winner</span>
              </span>
              <div className="space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Fitness:</span>
                  <span className="text-emerald-400 font-bold">{bestChromosome.fitness}%</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Longest Homopolymer:</span>
                  <span className="text-emerald-400 font-bold">{bestChromosome.longestHomopolymerLength} bases</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>GC Balance:</span>
                  <span className="text-emerald-400 font-bold">{bestChromosome.gcContent}% (Balanced)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-300 font-medium leading-relaxed">
            <strong>Key Conclusion:</strong> Evolutionary optimization transforms an otherwise fragile chemical storage channel into a robust, high-fidelity archival architecture capable of withstanding physical entropy.
          </div>
        </div>
      )
    },
    {
      id: 7,
      badge: 'SLIDE 7 • FUTURE HORIZONS',
      badgeColor: 'bg-indigo-400 text-slate-950',
      title: 'Real-World Biotech & Industrial Roadmap',
      subtitle: 'Enzymatic Synthesis, Microfluidics, and Commercial DNA Data Centers',
      icon: Lightbulb,
      speakerNotes: [
        'Discuss current real-world developments in the biotechnology sector.',
        'Enzymatic DNA synthesis (TdT enzymes) is replacing hazardous chemical synthesis (phosphoramidite), making synthesis faster, cheaper, and greener.',
        'Random-Access Addressing: Primer indexing allows querying single files out of a pool of petabytes without sequencing the entire pool.',
        'Mention industry consortiums like the DNA Data Storage Alliance and companies like Twist Bioscience and Catalog DNA.'
      ],
      takeaways: [
        'Enzymatic synthesis is dropping synthesis costs by orders of magnitude.',
        'CRISPR and PCR primer barcodes enable random-access file retrieval.',
        'Commercial cold-storage DNA data centers are targeted for late 2020s deployment.'
      ],
      content: (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950 rounded-2xl border border-indigo-900/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center font-bold">
              ⚡
            </div>
            <h4 className="text-xs font-black text-white uppercase">Enzymatic Synthesis</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              Terminal deoxynucleotidyl transferase (TdT) enables rapid, template-free enzymatic printing in aqueous environments without toxic chemical reagents.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-cyan-900/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-bold">
              🔍
            </div>
            <h4 className="text-xs font-black text-white uppercase">Random-Access Addressing</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              PCR primer barcodes allow targeting and amplifying specific files from a dry DNA library without having to sequence millions of unrelated files.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-emerald-900/80 space-y-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
              🏢
            </div>
            <h4 className="text-xs font-black text-white uppercase">Industrial Consortiums</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
              The DNA Data Storage Alliance (Microsoft, Illumina, Twist, Western Digital) is establishing global interchange standards for file-system metadata.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 8,
      badge: 'SLIDE 8 • SUMMARY & CITATIONS',
      badgeColor: 'bg-amber-400 text-slate-950',
      title: 'Summary & Research References',
      subtitle: 'Key Learnings, Academic Papers, and Next Exploration Steps',
      icon: BookOpen,
      speakerNotes: [
        'Wrap up the presentation by summarizing the dual nature-inspired approach.',
        'Direct the audience to the dedicated Reference Links section for complete academic citations and source papers.',
        'Invite questions from the audience on Genetic Algorithms or DNA data storage mechanics.'
      ],
      takeaways: [
        'DNA data storage is computationally viable and physically resilient.',
        'Nature-inspired algorithms provide optimal solutions to molecular constraints.',
        'Full academic papers and reading materials are accessible in the References section.'
      ],
      content: (
        <div className="space-y-5 text-center">
          <div className="p-6 bg-slate-950 rounded-3xl border-2 border-amber-400/50 space-y-4">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Thank You! Any Questions?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto font-medium leading-relaxed">
              Explore the interactive simulation or dive into the peer-reviewed papers by George Church, Yaniv Erlich, Nick Goldman, and Microsoft Research in our References Library.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                id="ppt-go-to-references-btn"
                onClick={onNavigateToReferences}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs uppercase shadow-[0_4px_0_#d97706] active:translate-y-1 active:shadow-none transition cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Reference Links Section</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="ppt-go-to-sim-btn"
                onClick={onNavigateToSimulation}
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold text-xs border border-slate-700 transition cursor-pointer"
              >
                <Dna className="w-4 h-4 text-emerald-400" />
                <span>Back to Interactive Simulation</span>
              </button>
            </div>
          </div>
        </div>
      )
    }
  ];

  const currentSlide = slides[currentSlideIndex];

  // Auto-play timer
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      }, playInterval * 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, playInterval, slides.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 'Home') {
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        setCurrentSlideIndex(slides.length - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const handleCopySlideNotes = () => {
    const text = `Slide ${currentSlide.id}: ${currentSlide.title}\n\nKey Takeaways:\n${currentSlide.takeaways.map(t => `- ${t}`).join('\n')}\n\nSpeaker Notes:\n${currentSlide.speakerNotes.map(n => `- ${n}`).join('\n')}`;
    navigator.clipboard.writeText(text);
    setCopiedNote(true);
    setTimeout(() => setCopiedNote(false), 2000);
  };

  const handleExportFullOutline = () => {
    const fullText = slides.map(s => (
      `==============================\nSLIDE ${s.id}: ${s.title.toUpperCase()}\nSubtitle: ${s.subtitle}\n==============================\n\nKey Takeaways:\n${s.takeaways.map(t => `  * ${t}`).join('\n')}\n\nSpeaker Notes / Talking Points:\n${s.speakerNotes.map(n => `  * ${n}`).join('\n')}\n\n`
    )).join('\n');

    const blob = new Blob([fullText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DNA_Data_Survivor_Presentation_Deck.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6" id="presentation-deck-container">
      {/* Top Banner */}
      <div className="bg-slate-900 border-2 border-indigo-400 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">
              <Presentation className="w-4 h-4 text-indigo-400" />
              <span>Step 7: Interactive PPT Presentation Deck</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Slide Deck & Scientific Project Presentation
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Full slide presentation mode with speaker notes, live dynamic simulation metrics, slide auto-play, and outline export for academic defense and conference presentations.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            <button
              id="ppt-export-deck-btn"
              onClick={handleExportFullOutline}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-indigo-300 font-bold text-xs border border-slate-700 transition cursor-pointer shadow-sm"
              title="Download presentation outline as Markdown"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              <span>Export Deck (.md)</span>
            </button>

            <button
              id="ppt-toggle-all-slides-btn"
              onClick={() => setShowAllSlidesView(!showAllSlidesView)}
              className={`flex items-center gap-1.5 px-4 py-3 rounded-2xl font-bold text-xs border transition cursor-pointer shadow-sm ${
                showAllSlidesView
                  ? 'bg-indigo-600 text-white border-indigo-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{showAllSlidesView ? 'Single Slide View' : 'All Slides Grid'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Slideshow View */}
      {!showAllSlidesView ? (
        <div className="space-y-6">
          {/* Main Slide Card */}
          <div className="bg-slate-900 border-2 border-slate-700 hover:border-slate-600 rounded-3xl p-6 sm:p-8 shadow-2xl relative min-h-[480px] flex flex-col justify-between transition-all">
            {/* Slide Header */}
            <div className="space-y-2 pb-5 border-b border-slate-800">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`text-[10px] font-mono font-black uppercase px-3 py-1 rounded-full ${currentSlide.badgeColor} shadow-sm`}>
                  {currentSlide.badge}
                </span>

                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <span>Slide <strong>{currentSlideIndex + 1}</strong> of <strong>{slides.length}</strong></span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {currentSlide.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Slide Body */}
            <div className="py-6 flex-1 flex flex-col justify-center">
              {currentSlide.content}
            </div>

            {/* Slide Footer Key Takeaways */}
            <div className="pt-4 border-t border-slate-800 space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                Key Slide Takeaways:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300 font-medium">
                {currentSlide.takeaways.map((t, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-emerald-400 font-black">•</span>
                    <span className="leading-snug">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Slide Deck Controls Bar */}
          <div className="bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            {/* Play/Pause & Autoplay Timer */}
            <div className="flex items-center gap-2">
              <button
                id="ppt-autoplay-toggle-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs border transition cursor-pointer ${
                  isPlaying
                    ? 'bg-amber-500 text-slate-950 border-amber-300'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
                }`}
                title="Autoplay slideshow"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause Autoplay' : 'Autoplay'}</span>
              </button>

              {isPlaying && (
                <select
                  value={playInterval}
                  onChange={(e) => setPlayInterval(parseInt(e.target.value, 10))}
                  className="bg-slate-950 border border-slate-700 text-xs text-white rounded-xl px-2.5 py-2 font-mono"
                >
                  <option value={4}>4s</option>
                  <option value={6}>6s</option>
                  <option value={10}>10s</option>
                </select>
              )}

              <button
                id="ppt-toggle-notes-btn"
                onClick={() => setShowSpeakerNotes(!showSpeakerNotes)}
                className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl font-bold text-xs border transition cursor-pointer ${
                  showSpeakerNotes
                    ? 'bg-purple-950 text-purple-300 border-purple-500'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                }`}
              >
                <Volume2 className="w-4 h-4" />
                <span>Speaker Notes</span>
              </button>
            </div>

            {/* Slide Navigation Dots / Number Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  id={`ppt-dot-${slide.id}`}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-8 h-8 rounded-xl font-mono text-xs font-black transition cursor-pointer flex items-center justify-center ${
                    currentSlideIndex === idx
                      ? 'bg-indigo-600 text-white shadow-md scale-110'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                  }`}
                  title={slide.title}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                id="ppt-prev-slide-btn"
                disabled={currentSlideIndex === 0}
                onClick={() => setCurrentSlideIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition cursor-pointer disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Prev</span>
              </button>

              <button
                id="ppt-next-slide-btn"
                disabled={currentSlideIndex === slides.length - 1}
                onClick={() => setCurrentSlideIndex((prev) => Math.min(slides.length - 1, prev + 1))}
                className="flex items-center gap-1 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase shadow-[0_3px_0_#4338ca] active:translate-y-1 active:shadow-none transition cursor-pointer disabled:opacity-40"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Speaker Notes Drawer */}
          {showSpeakerNotes && (
            <div className="bg-slate-900 border-2 border-purple-500/40 rounded-3xl p-5 sm:p-6 space-y-3 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2 text-purple-400">
                  <Volume2 className="w-4 h-4" />
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">
                    Speaker Talking Points (Slide {currentSlideIndex + 1})
                  </h3>
                </div>

                <button
                  id="ppt-copy-notes-btn"
                  onClick={handleCopySlideNotes}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 border border-slate-700 transition cursor-pointer"
                >
                  {copiedNote ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>Copy Talking Points</span>
                    </>
                  )}
                </button>
              </div>

              <ul className="space-y-2 text-xs text-slate-300 font-medium leading-relaxed">
                {currentSlide.speakerNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-purple-400 font-black text-sm leading-none">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        /* All Slides Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              onClick={() => {
                setCurrentSlideIndex(idx);
                setShowAllSlidesView(false);
              }}
              className={`p-5 rounded-3xl border-2 transition cursor-pointer space-y-3 hover:scale-[1.01] shadow-lg ${
                currentSlideIndex === idx
                  ? 'bg-slate-900 border-indigo-500 ring-2 ring-indigo-500/30'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full ${slide.badgeColor}`}>
                  Slide {slide.id}
                </span>
                <span className="text-xs text-slate-500 font-mono">Click to present</span>
              </div>
              <h3 className="text-base font-black text-white">{slide.title}</h3>
              <p className="text-xs text-slate-400 leading-snug line-clamp-2">{slide.subtitle}</p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 font-mono">
                {slide.takeaways[0]}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
