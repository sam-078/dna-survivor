import { ComparisonResult, ResearchChartDataPoint, Chromosome, GAParameters } from '../types';
import { simulateDnaDamage } from './errorSimulator';
import { recoverMessageFromDna } from './recoveryEngine';

/**
 * Runs a head-to-head battle between Raw Un-optimized DNA and GA-Optimized DNA
 * under the exact same biological noise conditions.
 */
export function runHeadToHeadComparison(
  originalText: string,
  rawChromosome: Chromosome,
  gaChromosome: Chromosome,
  errorRate: number,
  redundancyStrands: number = 3
): ComparisonResult {
  // 1. Simulate damage on raw sequence
  const rawDamage = simulateDnaDamage(rawChromosome.dnaSequence, errorRate, 'mixed', true);
  const rawRecovery = recoverMessageFromDna(originalText, rawChromosome.keySeed, rawDamage, redundancyStrands);

  // 2. Simulate damage on GA sequence
  const gaDamage = simulateDnaDamage(gaChromosome.dnaSequence, errorRate, 'mixed', true);
  const gaRecovery = recoverMessageFromDna(originalText, gaChromosome.keySeed, gaDamage, redundancyStrands);

  return {
    raw: {
      name: 'Baseline / Raw Encoding',
      dnaSequence: rawChromosome.dnaSequence,
      fitness: rawChromosome.fitness,
      gcContent: rawChromosome.gcContent,
      homopolymerLen: rawChromosome.longestHomopolymerLength,
      errorRate,
      errorsIntroduced: rawDamage.totalErrors,
      recoveryPercentage: rawRecovery.recoveryPercentage,
      status: rawRecovery.status,
      recoveredText: rawRecovery.correctedText,
    },
    ga: {
      name: 'GA-Optimized Encoding',
      dnaSequence: gaChromosome.dnaSequence,
      fitness: gaChromosome.fitness,
      gcContent: gaChromosome.gcContent,
      homopolymerLen: gaChromosome.longestHomopolymerLength,
      errorRate,
      errorsIntroduced: gaDamage.totalErrors,
      recoveryPercentage: gaRecovery.recoveryPercentage,
      status: gaRecovery.status,
      recoveredText: gaRecovery.correctedText,
    },
  };
}

/**
 * Generates dynamic research benchmark data by running real simulations across multiple error rates.
 * Sweeps [0, 1, 2, 3, 4, 5, 7, 10, 12, 15]% error rates.
 */
export function generateErrorRateBenchmarkData(
  originalText: string,
  rawChromosome: Chromosome,
  gaChromosome: Chromosome,
  trialsPerPoint: number = 12,
  redundancyStrands: number = 3
): ResearchChartDataPoint[] {
  const errorRates = [0, 1, 2, 3, 4, 5, 7, 10, 12, 15];
  const results: ResearchChartDataPoint[] = [];

  for (const rate of errorRates) {
    let rawSum = 0;
    let gaSum = 0;

    for (let t = 0; t < trialsPerPoint; t++) {
      // Raw trial
      const rawDamage = simulateDnaDamage(rawChromosome.dnaSequence, rate, 'mixed', true);
      const rawRec = recoverMessageFromDna(originalText, rawChromosome.keySeed, rawDamage, redundancyStrands);
      rawSum += rawRec.recoveryPercentage;

      // GA trial
      const gaDamage = simulateDnaDamage(gaChromosome.dnaSequence, rate, 'mixed', true);
      const gaRec = recoverMessageFromDna(originalText, gaChromosome.keySeed, gaDamage, redundancyStrands);
      gaSum += gaRec.recoveryPercentage;
    }

    const rawAvg = Math.round((rawSum / trialsPerPoint) * 10) / 10;
    const gaAvg = Math.round((gaSum / trialsPerPoint) * 10) / 10;

    results.push({
      errorRate: rate,
      rawRecovery: rawAvg,
      gaRecovery: gaAvg,
    });
  }

  return results;
}
