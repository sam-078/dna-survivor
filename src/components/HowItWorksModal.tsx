import React, { useState } from 'react';
import {
  X,
  Dna,
  Binary,
  Layers,
  Sparkles,
  Flame,
  CheckCircle2,
  HelpCircle,
  BookOpen,
  ArrowDown,
  Info,
} from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface GlossaryItem {
  term: string;
  category: string;
  definition: string;
}

const GLOSSARY: GlossaryItem[] = [
  {
    term: 'DNA (Deoxyribonucleic Acid)',
    category: 'Biology',
    definition:
      'The biological polymer carrying genetic instructions. Uses 4 chemical nucleotide bases: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G).',
  },
  {
    term: 'GC Content',
    category: 'Biochemistry',
    definition:
      'The percentage of nitrogenous bases that are either Guanine (G) or Cytosine (C). Ideal range is 40%–60% for chemical stability and to prevent secondary hairpin folds.',
  },
  {
    term: 'Homopolymers',
    category: 'Sequencing',
    definition:
      'Consecutive identical bases (e.g., AAAAA or GGGGG). In real DNA synthesis & sequencing (Nanopore, Illumina), enzymes slip on homopolymers, causing massive reading errors.',
  },
  {
    term: 'Genetic Algorithm (GA)',
    category: 'Computer Science',
    definition:
      'An optimization technique inspired by natural Darwinian evolution that uses selection, crossover, and mutation to discover high-fitness solutions.',
  },
  {
    term: 'Selection',
    category: 'Evolution',
    definition:
      'A mechanism (like tournament selection) where sequences with superior biochemical fitness have a higher probability of passing traits to future generations.',
  },
  {
    term: 'Crossover',
    category: 'Evolution',
    definition:
      'Combining structural genetic parameters from two parent chromosomes to produce offspring that inherit beneficial traits from both.',
  },
  {
    term: 'Mutation',
    category: 'Evolution',
    definition:
      'Injecting small, randomized variations into candidate sequences to maintain genetic diversity and avoid becoming stuck in local optima.',
  },
  {
    term: 'Error Rate',
    category: 'Storage',
    definition:
      'The percentage of synthesized DNA bases subjected to environmental decay, chemical deamination, or sequencing misreads.',
  },
  {
    term: 'Recovery Rate',
    category: 'Storage',
    definition:
      'The percentage of original digital data bits and characters successfully reconstructed after decoding and error correction.',
  },
];

const PIPELINE_STEPS = [
  { step: 'Digital Data', desc: 'Raw text message or file (e.g. "HELLO WORLD")', icon: '💻' },
  { step: 'Binary', desc: 'Convert text to 8-bit UTF-8 bitstream (01001000...)', icon: '🔢' },
  { step: 'DNA Encoding', desc: 'Map 2 bits to 1 nucleotide base (00=A, 01=C, 10=G, 11=T)', icon: '🧬' },
  { step: 'Genetic Algorithm', desc: 'Evolve scrambler permutations to balance GC content & eradicate homopolymers', icon: '🌱' },
  { step: 'DNA Sequence', desc: 'Biochemically stable synthetic candidate strand ready for archival storage', icon: '🧪' },
  { step: 'Artificial Damage', desc: 'Simulated physical entropy, radiation, and sequencing noise', icon: '💥' },
  { step: 'Error Correction', desc: 'Multi-strand consensus majority voting and parity reconstruction', icon: '🔬' },
  { step: 'Recovered Data', desc: 'Original digital message restored with statistical fidelity verification', icon: '✅' },
];

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  const [selectedGlossary, setSelectedGlossary] = useState<GlossaryItem | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl space-y-6 p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center shadow-lg">
              <Dna className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">How DNA Data Survivor Works</h2>
              <p className="text-xs text-slate-400 font-medium">
                Nature-Inspired Storage & Evolutionary Optimization
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Why this is Nature-Inspired Banner */}
        <div className="bg-slate-950 border-2 border-emerald-400 rounded-3xl p-5 space-y-3 shadow-lg">
          <h3 className="text-xs font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Why is this Nature-Inspired?</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed text-slate-300">
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
              <span className="font-black text-emerald-400 text-sm block mb-1">
                🧬 DNA Data Storage
              </span>
              Nature has evolved DNA over billions of years as an ultra-compact information carrier. 1 gram of DNA can theoretically store ~215 Petabytes for thousands of years without electric power.
            </div>
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-sm">
              <span className="font-black text-cyan-400 text-sm block mb-1">
                🌱 Genetic Algorithm
              </span>
              The algorithm imitates biological evolution through selection, crossover, and mutation to solve difficult molecular constraint problems that would cause sequencing machines to fail.
            </div>
          </div>
        </div>

        {/* End-to-End Pipeline Visualization */}
        <div className="space-y-3">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Data-to-Molecule End-to-End Pipeline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {PIPELINE_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="bg-slate-950 border-2 border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between space-y-1 relative group hover:border-cyan-400 transition shadow"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{step.icon}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                    Step {idx + 1}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-200">{step.step}</h4>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 font-medium">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Glossary / Tooltips */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black text-white uppercase tracking-widest flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>Interactive Scientific Glossary</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {GLOSSARY.map((item) => (
              <div
                key={item.term}
                className="bg-slate-950 border-2 border-slate-800 hover:border-purple-400 rounded-2xl p-3.5 text-xs space-y-1 transition shadow"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-black text-purple-300">{item.term}</span>
                  <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-400 uppercase font-mono font-bold border border-slate-800 flex-shrink-0">
                    {item.category}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  {item.definition}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase shadow-[0_4px_0_#059669] active:translate-y-1 active:shadow-none transition cursor-pointer"
          >
            Got it, Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};
