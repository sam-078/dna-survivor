import React, { useState } from 'react';
import { GAParameters } from '../types';
import { X, Sliders, RotateCcw, Check, Sparkles } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  params: GAParameters;
  onSaveParams: (newParams: GAParameters) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  params,
  onSaveParams,
}) => {
  const [localParams, setLocalParams] = useState<GAParameters>({ ...params });

  if (!isOpen) return null;

  const handleResetDefaults = () => {
    const defaultParams: GAParameters = {
      populationSize: 16,
      maxGenerations: 15,
      mutationRate: 0.15,
      crossoverRate: 0.75,
      redundancyStrands: 3,
    };
    setLocalParams(defaultParams);
  };

  const handleSave = () => {
    onSaveParams(localParams);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-lg w-full shadow-2xl p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-400 text-slate-950 flex items-center justify-center shadow">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Genetic Algorithm Settings</h2>
              <p className="text-xs text-slate-400 font-medium">Configure evolutionary hyperparameters</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sliders and Controls */}
        <div className="space-y-3.5 text-xs">
          {/* Population Size */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between">
              <label className="font-bold text-slate-200">Population Size (Chromosomes)</label>
              <span className="font-mono font-black text-cyan-400 text-sm">{localParams.populationSize}</span>
            </div>
            <input
              type="range"
              min={8}
              max={32}
              step={4}
              value={localParams.populationSize}
              onChange={(e) =>
                setLocalParams({ ...localParams, populationSize: parseInt(e.target.value, 10) })
              }
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[10px] text-slate-500 font-medium">Number of candidate DNA scrambler chromosomes per generation.</p>
          </div>

          {/* Max Generations */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between">
              <label className="font-bold text-slate-200">Max Evolutionary Generations</label>
              <span className="font-mono font-black text-cyan-400 text-sm">{localParams.maxGenerations}</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={5}
              value={localParams.maxGenerations}
              onChange={(e) =>
                setLocalParams({ ...localParams, maxGenerations: parseInt(e.target.value, 10) })
              }
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[10px] text-slate-500 font-medium">Number of generational breeding cycles for evolution.</p>
          </div>

          {/* Crossover Rate */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between">
              <label className="font-bold text-slate-200">Crossover Rate</label>
              <span className="font-mono font-black text-cyan-400 text-sm">
                {Math.round(localParams.crossoverRate * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.4}
              max={0.95}
              step={0.05}
              value={localParams.crossoverRate}
              onChange={(e) =>
                setLocalParams({ ...localParams, crossoverRate: parseFloat(e.target.value) })
              }
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[10px] text-slate-500 font-medium">Probability that parent sequences recombine structural segments.</p>
          </div>

          {/* Mutation Rate */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between">
              <label className="font-bold text-slate-200">Mutation Rate</label>
              <span className="font-mono font-black text-cyan-400 text-sm">
                {Math.round(localParams.mutationRate * 100)}%
              </span>
            </div>
            <input
              type="range"
              min={0.05}
              max={0.4}
              step={0.05}
              value={localParams.mutationRate}
              onChange={(e) =>
                setLocalParams({ ...localParams, mutationRate: parseFloat(e.target.value) })
              }
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <p className="text-[10px] text-slate-500 font-medium">Probability of random gene variations per chromosome.</p>
          </div>

          {/* Redundancy Strands */}
          <div className="space-y-1.5 bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="flex justify-between">
              <label className="font-bold text-slate-200">Redundant Sequencing Strands (Voting Depth)</label>
              <span className="font-mono font-black text-emerald-400 text-sm">{localParams.redundancyStrands}x</span>
            </div>
            <input
              type="range"
              min={1}
              max={5}
              step={2}
              value={localParams.redundancyStrands}
              onChange={(e) =>
                setLocalParams({ ...localParams, redundancyStrands: parseInt(e.target.value, 10) })
              }
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
            />
            <p className="text-[10px] text-slate-500 font-medium">Number of independent reads used in physical majority-voting error correction.</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
          <button
            onClick={handleResetDefaults}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer font-bold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase shadow-[0_4px_0_#0891b2] active:translate-y-1 active:shadow-none transition cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Apply Parameters</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
