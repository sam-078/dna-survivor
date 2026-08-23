import React from 'react';
import { SimulationStep } from '../types';
import { Binary, Dna, Flame, Sparkles, Swords, BarChart3, Check } from 'lucide-react';

interface FlowNavigationProps {
  currentStep: SimulationStep;
  onSelectStep: (step: SimulationStep) => void;
  completedSteps: Set<SimulationStep>;
}

interface StepMeta {
  id: SimulationStep;
  number: number;
  label: string;
  sublabel: string;
  icon: React.ComponentType<{ className?: string }>;
  activeBorder: string;
  activeBg: string;
  activeText: string;
  badgeBg: string;
}

const STEPS: StepMeta[] = [
  {
    id: 'encode',
    number: 1,
    label: 'ENCODE',
    sublabel: 'Text → Binary → DNA',
    icon: Binary,
    activeBorder: 'border-indigo-500 ring-2 ring-indigo-500/30',
    activeBg: 'bg-indigo-950/80',
    activeText: 'text-indigo-300',
    badgeBg: 'bg-indigo-600 text-white',
  },
  {
    id: 'evolve',
    number: 2,
    label: 'EVOLVE!',
    sublabel: 'Genetic Algorithm',
    icon: Dna,
    activeBorder: 'border-emerald-500 ring-2 ring-emerald-500/30',
    activeBg: 'bg-emerald-950/80',
    activeText: 'text-emerald-300',
    badgeBg: 'bg-emerald-500 text-slate-950',
  },
  {
    id: 'damage',
    number: 3,
    label: 'DAMAGE',
    sublabel: 'Simulate Noise & Errors',
    icon: Flame,
    activeBorder: 'border-rose-500 ring-2 ring-rose-500/30',
    activeBg: 'bg-rose-950/80',
    activeText: 'text-rose-300',
    badgeBg: 'bg-rose-500 text-slate-950',
  },
  {
    id: 'recover',
    number: 4,
    label: 'RECOVER',
    sublabel: 'Error Correction Check',
    icon: Sparkles,
    activeBorder: 'border-purple-500 ring-2 ring-purple-500/30',
    activeBg: 'bg-purple-950/80',
    activeText: 'text-purple-300',
    badgeBg: 'bg-purple-500 text-white',
  },
  {
    id: 'compare',
    number: 5,
    label: 'COMPARISON',
    sublabel: 'Raw vs GA Battle',
    icon: Swords,
    activeBorder: 'border-cyan-500 ring-2 ring-cyan-500/30',
    activeBg: 'bg-cyan-950/80',
    activeText: 'text-cyan-300',
    badgeBg: 'bg-cyan-400 text-slate-950',
  },
  {
    id: 'research',
    number: 6,
    label: 'RESEARCH GRAPH',
    sublabel: 'Fidelity & Trends',
    icon: BarChart3,
    activeBorder: 'border-amber-500 ring-2 ring-amber-500/30',
    activeBg: 'bg-amber-950/80',
    activeText: 'text-amber-300',
    badgeBg: 'bg-amber-500 text-slate-950',
  },
];

export const FlowNavigation: React.FC<FlowNavigationProps> = ({
  currentStep,
  onSelectStep,
  completedSteps,
}) => {
  return (
    <div className="w-full bg-slate-950/90 border-b border-slate-800 py-3.5 px-4 sm:px-6" id="flow-navigation">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.has(step.id);

            return (
              <button
                key={step.id}
                id={`step-nav-${step.id}`}
                onClick={() => onSelectStep(step.id)}
                className={`flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer relative overflow-hidden group shadow-lg ${
                  isActive
                    ? `${step.activeBg} ${step.activeBorder} shadow-xl scale-[1.02]`
                    : isCompleted
                    ? 'bg-slate-900/90 border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/80 text-slate-200'
                    : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 text-slate-400'
                }`}
              >
                {/* Step indicator circle / icon */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-mono text-xs font-black flex-shrink-0 transition-all ${
                    isActive
                      ? `${step.badgeBg} shadow-md scale-105`
                      : isCompleted
                      ? 'bg-slate-800 text-emerald-400 border border-emerald-500/30'
                      : 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {isCompleted && !isActive ? (
                    <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-xs font-black tracking-wider uppercase truncate ${
                        isActive ? 'text-white' : 'text-slate-200'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5 font-medium">
                    {step.sublabel}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
