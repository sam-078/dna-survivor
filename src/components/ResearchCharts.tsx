import React, { useState } from 'react';
import { ResearchChartDataPoint, GenerationHistoryPoint } from '../types';
import {
  BarChart3,
  TrendingUp,
  RotateCw,
  Info,
  ShieldCheck,
  Dna,
  Layers,
  Sparkles,
  BookOpen,
  Presentation,
  ArrowRight,
} from 'lucide-react';

interface ResearchChartsProps {
  benchmarkData: ResearchChartDataPoint[];
  generationHistory: GenerationHistoryPoint[];
  onRerunBenchmark: () => void;
  isBenchmarking: boolean;
  onProceedToPpt?: () => void;
  onProceedToReferences?: () => void;
}

export const ResearchCharts: React.FC<ResearchChartsProps> = ({
  benchmarkData,
  generationHistory,
  onRerunBenchmark,
  isBenchmarking,
  onProceedToPpt,
  onProceedToReferences,
}) => {
  const [hoveredPointIdx, setHoveredPointIdx] = useState<number | null>(null);

  // SVG dimensions for Graph 1: Error Rate vs Recovery
  const chartWidth = 600;
  const chartHeight = 280;
  const padding = { top: 30, right: 30, bottom: 50, left: 55 };
  const innerW = chartWidth - padding.left - padding.right;
  const innerH = chartHeight - padding.top - padding.bottom;

  // Max values
  const maxErrorRate = 15;
  const maxRecovery = 100;

  // Coordinate mappers
  const getX = (rate: number) => padding.left + (rate / maxErrorRate) * innerW;
  const getY = (recovery: number) => padding.top + innerH - (recovery / maxRecovery) * innerH;

  // Construct SVG paths
  const rawPath = benchmarkData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.errorRate).toFixed(1)} ${getY(p.rawRecovery).toFixed(1)}`)
    .join(' ');

  const gaPath = benchmarkData
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${getX(p.errorRate).toFixed(1)} ${getY(p.gaRecovery).toFixed(1)}`)
    .join(' ');

  // Graph 2: Generation vs Fitness
  const maxGen = Math.max(15, generationHistory.length);
  const getGenX = (gen: number) => padding.left + ((gen - 1) / Math.max(1, maxGen - 1)) * innerW;
  const getFitnessY = (fit: number) => padding.top + innerH - (fit / 100) * innerH;

  const fitnessBestPath = generationHistory
    .map((h, i) => `${i === 0 ? 'M' : 'L'} ${getGenX(h.generation).toFixed(1)} ${getFitnessY(h.bestFitness).toFixed(1)}`)
    .join(' ');

  const fitnessAvgPath = generationHistory
    .map((h, i) => `${i === 0 ? 'M' : 'L'} ${getGenX(h.generation).toFixed(1)} ${getFitnessY(h.avgFitness).toFixed(1)}`)
    .join(' ');

  return (
    <div className="space-y-8" id="step-research-container">
      {/* Banner */}
      <div className="bg-slate-900 border-2 border-cyan-400 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1">
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              <span>Step 6: Empirical Research Simulation Analytics</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Dynamic Statistical Benchmark & Degradation Curves
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Real-time multi-trial Monte Carlo simulations demonstrating the quantitative survival advantage of Genetic Algorithm optimization over standard DNA encoding under increasing noise.
            </p>
          </div>

          <button
            id="rerun-benchmark-btn"
            onClick={onRerunBenchmark}
            disabled={isBenchmarking}
            className="flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs uppercase shadow-[0_4px_0_#0891b2] active:translate-y-1 active:shadow-none transition cursor-pointer disabled:opacity-50 flex-shrink-0"
          >
            <RotateCw className={`w-4 h-4 ${isBenchmarking ? 'animate-spin' : ''}`} />
            <span>{isBenchmarking ? 'Running Simulation...' : 'Re-run Monte Carlo Trials'}</span>
          </button>
        </div>
      </div>

      {/* Main Research Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1: Error Rate vs Data Recovery */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>Error Rate vs Data Recovery %</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Data recovery fidelity as simulated physical noise increases from 0% to 15%
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-rose-400">
                <span className="w-3 h-1.5 bg-rose-500 rounded-full" />
                <span>Raw DNA</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-3 h-1.5 bg-emerald-400 rounded-full" />
                <span>GA Optimized</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="relative bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-inner">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Horizontal Grid lines (Recovery 0%, 25%, 50%, 75%, 100%) */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = getY(val);
                return (
                  <g key={val}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Vertical Grid lines (Error Rates 0, 3, 5, 10, 15%) */}
              {[0, 3, 5, 7, 10, 15].map((rate) => {
                const x = getX(rate);
                return (
                  <g key={rate}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={chartHeight - padding.bottom}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={x}
                      y={chartHeight - padding.bottom + 16}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {rate}%
                    </text>
                  </g>
                );
              })}

              {/* Axis Labels */}
              <text
                x={chartWidth / 2}
                y={chartHeight - 10}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
              >
                Simulated Biochemical Error Rate (%)
              </text>

              <text
                x={-chartHeight / 2}
                y={15}
                transform="rotate(-90)"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
              >
                Data Recovery (%)
              </text>

              {/* Curves */}
              {/* Raw Curve */}
              <path
                d={rawPath}
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="4 3"
                className="transition-all duration-300"
              />

              {/* GA Optimized Curve */}
              <path
                d={gaPath}
                fill="none"
                stroke="#10b981"
                strokeWidth="3.5"
                className="transition-all duration-300"
              />

              {/* Interactive Data Points */}
              {benchmarkData.map((pt, i) => {
                const rx = getX(pt.errorRate);
                const ry = getY(pt.rawRecovery);
                const gx = getX(pt.errorRate);
                const gy = getY(pt.gaRecovery);
                const isHovered = hoveredPointIdx === i;

                return (
                  <g
                    key={i}
                    onMouseEnter={() => setHoveredPointIdx(i)}
                    onMouseLeave={() => setHoveredPointIdx(null)}
                    className="cursor-pointer"
                  >
                    {/* Raw point */}
                    <circle
                      cx={rx}
                      cy={ry}
                      r={isHovered ? 5.5 : 4}
                      fill="#f43f5e"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />

                    {/* GA point */}
                    <circle
                      cx={gx}
                      cy={gy}
                      r={isHovered ? 6.5 : 5}
                      fill="#10b981"
                      stroke="#0f172a"
                      strokeWidth="2"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Hover Tooltip Box */}
            {hoveredPointIdx !== null && benchmarkData[hoveredPointIdx] && (
              <div className="absolute top-4 right-4 bg-slate-900 border-2 border-slate-700 rounded-2xl p-3 shadow-2xl text-xs font-mono space-y-1 pointer-events-none z-10">
                <div className="text-slate-200 font-bold">
                  Error Rate: {benchmarkData[hoveredPointIdx].errorRate}%
                </div>
                <div className="text-emerald-400 font-bold">
                  GA Recovery: {benchmarkData[hoveredPointIdx].gaRecovery}%
                </div>
                <div className="text-rose-400 font-bold">
                  Raw Recovery: {benchmarkData[hoveredPointIdx].rawRecovery}%
                </div>
                <div className="text-[10px] text-cyan-300 font-black pt-1 border-t border-slate-800">
                  Advantage: +{(benchmarkData[hoveredPointIdx].gaRecovery - benchmarkData[hoveredPointIdx].rawRecovery).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Graph 2: Generation vs Best & Average Fitness */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <h3 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                <span>Generation vs Best Fitness</span>
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Optimization trajectory over evolutionary generations
              </p>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-1.5 bg-cyan-400 rounded-full" />
                <span>Best Fitness</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-1.5 bg-slate-500 rounded-full" />
                <span>Avg Fitness</span>
              </div>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="bg-slate-950 rounded-2xl p-3 border border-slate-800 shadow-inner">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="w-full h-auto overflow-visible select-none"
            >
              {/* Horizontal Grid lines (Fitness 0 to 100) */}
              {[0, 25, 50, 75, 100].map((val) => {
                const y = getFitnessY(val);
                return (
                  <g key={val}>
                    <line
                      x1={padding.left}
                      y1={y}
                      x2={chartWidth - padding.right}
                      y2={y}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={padding.left - 8}
                      y={y + 4}
                      textAnchor="end"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      {val}%
                    </text>
                  </g>
                );
              })}

              {/* Vertical Grid lines (Generations) */}
              {[1, 5, 10, 15, 20].map((gen) => {
                const x = getGenX(gen);
                return (
                  <g key={gen}>
                    <line
                      x1={x}
                      y1={padding.top}
                      x2={x}
                      y2={chartHeight - padding.bottom}
                      stroke="#1e293b"
                      strokeDasharray="4 4"
                    />
                    <text
                      x={x}
                      y={chartHeight - padding.bottom + 16}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      Gen {gen}
                    </text>
                  </g>
                );
              })}

              {/* Axis Labels */}
              <text
                x={chartWidth / 2}
                y={chartHeight - 10}
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
              >
                Evolutionary Generation Count
              </text>

              <text
                x={-chartHeight / 2}
                y={15}
                transform="rotate(-90)"
                textAnchor="middle"
                fill="#94a3b8"
                fontSize="11"
                fontWeight="bold"
              >
                Candidate Fitness (%)
              </text>

              {/* Avg Fitness Path */}
              {generationHistory.length > 0 && (
                <path
                  d={fitnessAvgPath}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth="2"
                  strokeDasharray="4 3"
                />
              )}

              {/* Best Fitness Path */}
              {generationHistory.length > 0 && (
                <path
                  d={fitnessBestPath}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="3.5"
                />
              )}

              {/* Generation Points */}
              {generationHistory.map((h, i) => {
                const x = getGenX(h.generation);
                const y = getFitnessY(h.bestFitness);
                return (
                  <circle
                    key={i}
                    cx={x}
                    cy={y}
                    r={4.5}
                    fill="#06b6d4"
                    stroke="#0f172a"
                    strokeWidth="2"
                  />
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Research Context & Educational Discussion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Research Context Card */}
        <div className="bg-slate-900 border-2 border-slate-800 hover:border-cyan-500/60 rounded-3xl p-6 space-y-3 shadow-lg transition">
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen className="w-5 h-5" />
            <h3 className="text-base font-black text-white">Research Context</h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            DNA data storage represents the frontier of ultra-dense, zero-power archival storage. A single gram of DNA can theoretically store up to <strong>215 Petabytes (215 million Gigabytes)</strong> and remain stable for thousands of years without electrical power.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            Pioneering academic teams (Harvard, Microsoft Research, University of Washington, Catalog DNA) rely on evolutionary heuristics and scrambler algorithms to satisfy strict biochemical constraints—preventing secondary hairpin loops and sequencing slippage.
          </p>
        </div>

        {/* Simulation Limitations Card */}
        <div className="bg-slate-900 border-2 border-slate-800 hover:border-purple-500/60 rounded-3xl p-6 space-y-3 shadow-lg transition">
          <div className="flex items-center gap-2 text-purple-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-base font-black text-white">Simulation Limitations & Disclaimer</h3>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed font-medium">
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>This web application is a <strong>simplified computer simulation model</strong> designed for educational exploration.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>No physical or biological DNA molecules are synthesized or manipulated in this software.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400 font-bold">•</span>
              <span>Real-world laboratory DNA storage incorporates advanced chemistry (phosphoramidite synthesis, nanopore flow cells) and high-dimensional Reed-Solomon / Fountain coding.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Next Steps */}
      <div className="bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-black text-white uppercase tracking-wider flex items-center justify-center sm:justify-start gap-2">
            <Presentation className="w-4 h-4 text-indigo-400" />
            <span>Ready for Defense & Presentation?</span>
          </h4>
          <p className="text-xs text-slate-300 font-medium">
            Jump to the interactive Slide Deck (PPT) or explore peer-reviewed literature and citations in the References section.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {onProceedToReferences && (
            <button
              id="research-go-to-references-btn"
              onClick={onProceedToReferences}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs border border-slate-700 transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>References Section</span>
            </button>
          )}

          {onProceedToPpt && (
            <button
              id="research-proceed-to-ppt-btn"
              onClick={onProceedToPpt}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase shadow-[0_4px_0_#4338ca] active:translate-y-1 active:shadow-none transition cursor-pointer"
            >
              <span>View PPT Slide Deck</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
