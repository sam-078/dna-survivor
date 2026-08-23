/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  SimulationStep,
  GAParameters,
  GenerationHistoryPoint,
  NoiseType,
} from './types';
import { encodeTextMessage, textToBinary } from './utils/dnaEncoding';
import {
  initializePopulation,
  evolveNextGeneration,
} from './utils/geneticAlgorithm';
import { simulateDnaDamage } from './utils/errorSimulator';
import { recoverMessageFromDna } from './utils/recoveryEngine';
import {
  runHeadToHeadComparison,
  generateErrorRateBenchmarkData,
} from './utils/monteCarlo';
import { Header } from './components/Header';
import { FlowNavigation } from './components/FlowNavigation';
import { EncodeStep } from './components/EncodeStep';
import { EvolveStep } from './components/EvolveStep';
import { DamageStep } from './components/DamageStep';
import { RecoverStep } from './components/RecoverStep';
import { ComparisonStep } from './components/ComparisonStep';
import { ResearchCharts } from './components/ResearchCharts';
import { HowItWorksModal } from './components/HowItWorksModal';
import { SettingsModal } from './components/SettingsModal';
import { DnaHelixVisual } from './components/DnaHelixVisual';
import {
  Dna,
  Binary,
  Flame,
  Sparkles,
  Swords,
  BarChart3,
  ArrowRight,
  Play,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const DEFAULT_MESSAGE = 'HELLO WORLD';

export default function App() {
  // Navigation & Modal State
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<SimulationStep>('encode');
  const [completedSteps, setCompletedSteps] = useState<Set<SimulationStep>>(
    new Set(['encode'])
  );
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Message & Encoding State
  const [messageText, setMessageText] = useState<string>(DEFAULT_MESSAGE);
  const encodedData = useMemo(() => encodeTextMessage(messageText), [messageText]);

  // Genetic Algorithm State
  const [gaParams, setGaParams] = useState<GAParameters>({
    populationSize: 16,
    maxGenerations: 15,
    mutationRate: 0.15,
    crossoverRate: 0.75,
    redundancyStrands: 3,
  });

  const [currentGeneration, setCurrentGeneration] = useState<number>(1);
  const [population, setPopulation] = useState(() =>
    initializePopulation(encodedData.binaryString, gaParams.populationSize)
  );

  const [generationHistory, setGenerationHistory] = useState<GenerationHistoryPoint[]>(() => {
    const initPop = initializePopulation(encodedData.binaryString, gaParams.populationSize);
    const best = initPop[0];
    const avgFit =
      Math.round((initPop.reduce((acc, curr) => acc + curr.fitness, 0) / initPop.length) * 10) / 10;
    return [
      {
        generation: 1,
        bestFitness: best.fitness,
        avgFitness: avgFit,
        bestGcContent: best.gcContent,
        bestHomopolymer: best.longestHomopolymerLength,
        bestSequence: best.dnaSequence,
      },
    ];
  });

  // Noise & Damage State
  const [errorRate, setErrorRate] = useState<number>(5); // default 5%
  const [noiseType, setNoiseType] = useState<NoiseType>('mixed');
  const [damageSeed, setDamageSeed] = useState<number>(0);

  // Derive Best Chromosome and Raw Baseline Chromosome
  const bestChromosome = population[0];
  const rawChromosome = useMemo(
    () => population.find((c) => c.keySeed === 0) || population[population.length - 1],
    [population]
  );

  // Damage Report
  const damageReport = useMemo(() => {
    return simulateDnaDamage(bestChromosome.dnaSequence, errorRate, noiseType, true);
  }, [bestChromosome.dnaSequence, errorRate, noiseType, damageSeed]);

  // Recovery Report
  const [recoverySeed, setRecoverySeed] = useState<number>(0);
  const recoveryReport = useMemo(() => {
    return recoverMessageFromDna(
      encodedData.originalText,
      bestChromosome.keySeed,
      damageReport,
      gaParams.redundancyStrands
    );
  }, [
    encodedData.originalText,
    bestChromosome.keySeed,
    damageReport,
    gaParams.redundancyStrands,
    recoverySeed,
  ]);

  // Comparison State
  const [comparisonSeed, setComparisonSeed] = useState<number>(0);
  const comparisonResult = useMemo(() => {
    return runHeadToHeadComparison(
      encodedData.originalText,
      rawChromosome,
      bestChromosome,
      errorRate,
      gaParams.redundancyStrands
    );
  }, [
    encodedData.originalText,
    rawChromosome,
    bestChromosome,
    errorRate,
    gaParams.redundancyStrands,
    comparisonSeed,
  ]);

  // Benchmark Analytics State
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [benchmarkData, setBenchmarkData] = useState(() =>
    generateErrorRateBenchmarkData(
      DEFAULT_MESSAGE,
      rawChromosome,
      bestChromosome,
      10,
      gaParams.redundancyStrands
    )
  );

  // Update population whenever message text changes
  const handleUpdateText = (newText: string) => {
    setMessageText(newText);
    const newBinary = textToBinary(newText);
    const newPop = initializePopulation(newBinary, gaParams.populationSize);
    setPopulation(newPop);
    setCurrentGeneration(1);
    const best = newPop[0];
    const avgFit =
      Math.round((newPop.reduce((acc, curr) => acc + curr.fitness, 0) / newPop.length) * 10) / 10;
    setGenerationHistory([
      {
        generation: 1,
        bestFitness: best.fitness,
        avgFitness: avgFit,
        bestGcContent: best.gcContent,
        bestHomopolymer: best.longestHomopolymerLength,
        bestSequence: best.dnaSequence,
      },
    ]);
  };

  // Step 1 Generation in GA
  const handleStepGeneration = useCallback(() => {
    if (currentGeneration >= gaParams.maxGenerations) return;
    const { newPopulation, historyPoint } = evolveNextGeneration(
      population,
      encodedData.binaryString,
      currentGeneration,
      gaParams
    );
    setPopulation(newPopulation);
    setCurrentGeneration((prev) => prev + 1);
    setGenerationHistory((prev) => [...prev, historyPoint]);
    setCompletedSteps((prev) => new Set([...prev, 'evolve']));
  }, [currentGeneration, gaParams, population, encodedData.binaryString]);

  // Auto evolve up to max generations
  const handleAutoEvolve = useCallback(
    (gensToRun: number) => {
      let curPop = population;
      let curGen = currentGeneration;
      const newHistory = [...generationHistory];

      for (let i = 0; i < gensToRun; i++) {
        if (curGen >= gaParams.maxGenerations) break;
        const res = evolveNextGeneration(curPop, encodedData.binaryString, curGen, gaParams);
        curPop = res.newPopulation;
        curGen++;
        newHistory.push(res.historyPoint);
      }

      setPopulation(curPop);
      setCurrentGeneration(curGen);
      setGenerationHistory(newHistory);
      setCompletedSteps((prev) => new Set([...prev, 'evolve']));
    },
    [population, currentGeneration, generationHistory, gaParams, encodedData.binaryString]
  );

  // Reset Population to Gen 1
  const handleResetPopulation = useCallback(() => {
    const newPop = initializePopulation(encodedData.binaryString, gaParams.populationSize);
    setPopulation(newPop);
    setCurrentGeneration(1);
    const best = newPop[0];
    const avgFit =
      Math.round((newPop.reduce((acc, curr) => acc + curr.fitness, 0) / newPop.length) * 10) / 10;
    setGenerationHistory([
      {
        generation: 1,
        bestFitness: best.fitness,
        avgFitness: avgFit,
        bestGcContent: best.gcContent,
        bestHomopolymer: best.longestHomopolymerLength,
        bestSequence: best.dnaSequence,
      },
    ]);
  }, [encodedData.binaryString, gaParams.populationSize]);

  // Full Simulation Reset
  const handleFullReset = () => {
    setMessageText(DEFAULT_MESSAGE);
    const newBinary = textToBinary(DEFAULT_MESSAGE);
    const newPop = initializePopulation(newBinary, gaParams.populationSize);
    setPopulation(newPop);
    setCurrentGeneration(1);
    setErrorRate(5);
    setNoiseType('mixed');
    setCurrentStep('encode');
    setCompletedSteps(new Set(['encode']));

    const best = newPop[0];
    const avgFit =
      Math.round((newPop.reduce((acc, curr) => acc + curr.fitness, 0) / newPop.length) * 10) / 10;
    setGenerationHistory([
      {
        generation: 1,
        bestFitness: best.fitness,
        avgFitness: avgFit,
        bestGcContent: best.gcContent,
        bestHomopolymer: best.longestHomopolymerLength,
        bestSequence: best.dnaSequence,
      },
    ]);
    setBenchmarkData(
      generateErrorRateBenchmarkData(
        DEFAULT_MESSAGE,
        newPop.find((c) => c.keySeed === 0) || newPop[newPop.length - 1],
        best,
        10,
        gaParams.redundancyStrands
      )
    );
  };

  // Re-run Benchmark Data
  const handleRerunBenchmark = () => {
    setIsBenchmarking(true);
    setTimeout(() => {
      const data = generateErrorRateBenchmarkData(
        encodedData.originalText,
        rawChromosome,
        bestChromosome,
        15,
        gaParams.redundancyStrands
      );
      setBenchmarkData(data);
      setIsBenchmarking(false);
    }, 250);
  };

  // Navigation handlers
  const handleStepSelect = (step: SimulationStep) => {
    setCurrentStep(step);
    setCompletedSteps((prev) => new Set([...prev, step]));
  };

  const handleStartSimulation = () => {
    setHasStarted(true);
    setCurrentStep('encode');
    setCompletedSteps(new Set(['encode']));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-['Outfit',sans-serif]">
      {/* Top Header */}
      <Header
        onOpenHowItWorks={() => setIsHowItWorksOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onReset={handleFullReset}
      />

      {/* Hero Welcome Screen (Shown if not started) */}
      {!hasStarted ? (
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden" id="welcome-screen">
          {/* Subtle Background Glows */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl w-full bg-slate-900 border-2 border-emerald-400 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6 relative text-center">
            <div className="inline-flex p-4 rounded-2xl bg-emerald-500 text-slate-950 shadow-lg mb-2">
              <Dna className="w-10 h-10 animate-bounce" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-black font-mono tracking-widest text-emerald-400 uppercase">
                Nature-Inspired Storage & Computing
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                🧬 DNA DATA SURVIVOR
              </h1>
              <p className="text-base sm:text-lg text-slate-300 font-bold italic">
                “Can your data survive evolution?”
              </p>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-lg mx-auto font-medium">
              Explore how biological molecules store digital information and how Genetic Algorithms evolve DNA sequences to resist environmental damage and biochemical sequencing noise.
            </p>

            <DnaHelixVisual count={12} className="opacity-70 my-2" />

            {/* Quick message input right on landing */}
            <div className="space-y-3 pt-2 text-left">
              <label className="text-xs font-black text-slate-300 uppercase tracking-wider block">
                Enter Your Message:
              </label>
              <input
                id="initial-message-input"
                type="text"
                value={messageText}
                onChange={(e) => handleUpdateText(e.target.value.toUpperCase())}
                placeholder="e.g. HELLO WORLD"
                className="w-full bg-slate-950 border-2 border-slate-700 focus:border-emerald-400 rounded-2xl px-4 py-3.5 text-lg font-mono text-white placeholder-slate-600 focus:outline-none transition shadow-inner font-bold"
                maxLength={40}
              />
            </div>

            {/* Start Button */}
            <button
              id="start-simulation-btn"
              onClick={handleStartSimulation}
              className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base uppercase shadow-[0_5px_0_#059669] active:translate-y-1 active:shadow-none transition cursor-pointer flex items-center justify-center gap-2 group"
            >
              <span>START SIMULATION</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-400 font-medium pt-2 border-t border-slate-800">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                No biological DNA synthesized
              </span>
              <span>•</span>
              <span>100% Client-Side Interactive Model</span>
            </div>
          </div>
        </main>
      ) : (
        /* Main Interactive Simulation Workspace */
        <main className="flex-1 flex flex-col" id="simulation-workspace">
          {/* Step Flow Navigation Tabs */}
          <FlowNavigation
            currentStep={currentStep}
            onSelectStep={handleStepSelect}
            completedSteps={completedSteps}
          />

          {/* Active Step Content Container */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {currentStep === 'encode' && (
              <EncodeStep
                encodedData={encodedData}
                onUpdateText={handleUpdateText}
                onProceedToEvolve={() => {
                  setCompletedSteps((prev) => new Set([...prev, 'encode']));
                  setCurrentStep('evolve');
                }}
              />
            )}

            {currentStep === 'evolve' && (
              <EvolveStep
                population={population}
                currentGeneration={currentGeneration}
                history={generationHistory}
                gaParams={gaParams}
                onStepGeneration={handleStepGeneration}
                onAutoEvolve={handleAutoEvolve}
                onResetPopulation={handleResetPopulation}
                onProceedToDamage={() => {
                  setCompletedSteps((prev) => new Set([...prev, 'evolve']));
                  setCurrentStep('damage');
                }}
              />
            )}

            {currentStep === 'damage' && (
              <DamageStep
                currentChromosome={bestChromosome}
                damageReport={damageReport}
                errorRate={errorRate}
                noiseType={noiseType}
                onChangeErrorRate={(r) => setErrorRate(r)}
                onChangeNoiseType={(t) => setNoiseType(t)}
                onReapplyDamage={() => {
                  setDamageSeed((prev) => prev + 1);
                }}
                onProceedToRecover={() => {
                  setCompletedSteps((prev) => new Set([...prev, 'damage']));
                  setCurrentStep('recover');
                }}
              />
            )}

            {currentStep === 'recover' && (
              <RecoverStep
                recoveryReport={recoveryReport}
                errorRate={errorRate}
                onRerunRecovery={() => setRecoverySeed((prev) => prev + 1)}
                onProceedToCompare={() => {
                  setCompletedSteps((prev) => new Set([...prev, 'recover']));
                  setCurrentStep('compare');
                }}
              />
            )}

            {currentStep === 'compare' && (
              <ComparisonStep
                comparison={comparisonResult}
                onRunComparison={() => setComparisonSeed((prev) => prev + 1)}
                onProceedToResearch={() => {
                  setCompletedSteps((prev) => new Set([...prev, 'compare']));
                  setCurrentStep('research');
                }}
              />
            )}

            {currentStep === 'research' && (
              <ResearchCharts
                benchmarkData={benchmarkData}
                generationHistory={generationHistory}
                onRerunBenchmark={handleRerunBenchmark}
                isBenchmarking={isBenchmarking}
              />
            )}
          </div>
        </main>
      )}

      {/* Educational & Settings Modals */}
      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        params={gaParams}
        onSaveParams={(newParams) => {
          setGaParams(newParams);
          // Re-initialize with new population size
          const newPop = initializePopulation(encodedData.binaryString, newParams.populationSize);
          setPopulation(newPop);
          setCurrentGeneration(1);
        }}
      />
    </div>
  );
}
