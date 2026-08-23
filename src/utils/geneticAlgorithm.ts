import { Chromosome, GAParameters, GenerationHistoryPoint, DnaBase } from '../types';
import {
  binaryToDna,
  calculateGcContent,
  findLongestHomopolymer,
  scrambleBinary,
} from './dnaEncoding';

/**
 * Calculates biological storage fitness score (0-100) for a candidate DNA sequence.
 * High fitness = 45-55% GC content + no homopolymer runs > 2.
 */
export function evaluateDnaFitness(dna: string): {
  fitness: number;
  gcContent: number;
  longestHomopolymer: number;
  homopolymerBase: DnaBase | '';
  gcPenalty: number;
  homopolymerPenalty: number;
} {
  const gcContent = calculateGcContent(dna);
  const homopolymer = findLongestHomopolymer(dna);

  // GC Content balance: 50% is ideal, 45-55% is great, <40% or >60% suffers penalty
  const gcDeviation = Math.abs(gcContent - 50);
  let gcPenalty = 0;
  if (gcDeviation > 5) {
    gcPenalty = Math.min(45, (gcDeviation - 5) * 1.8);
  }

  // Homopolymer run penalty: in DNA synthesis & sequencing, runs > 2 cause error rates to spike
  let homopolymerPenalty = 0;
  if (homopolymer.length >= 3) {
    // 3 bases = -12, 4 bases = -25, 5 bases = -42, etc.
    homopolymerPenalty = Math.min(50, Math.pow(homopolymer.length - 2, 1.4) * 14);
  }

  // Raw fitness score scaled to 0-100
  const rawFitness = 100 - gcPenalty - homopolymerPenalty;
  const fitness = Math.max(5, Math.min(100, Math.round(rawFitness * 10) / 10));

  return {
    fitness,
    gcContent,
    longestHomopolymer: homopolymer.length,
    homopolymerBase: homopolymer.base,
    gcPenalty: Math.round(gcPenalty * 10) / 10,
    homopolymerPenalty: Math.round(homopolymerPenalty * 10) / 10,
  };
}

/** Create a single chromosome given raw binary and a scrambler seed */
export function createChromosome(rawBinary: string, seed: number, generation: number = 1): Chromosome {
  const scrambled = scrambleBinary(rawBinary, seed);
  const dna = binaryToDna(scrambled);
  const metrics = evaluateDnaFitness(dna);

  return {
    id: `chr-${generation}-${seed}-${Math.random().toString(36).substring(2, 6)}`,
    keySeed: seed,
    dnaSequence: dna,
    gcContent: metrics.gcContent,
    longestHomopolymerLength: metrics.longestHomopolymer,
    homopolymerBase: metrics.homopolymerBase,
    fitness: metrics.fitness,
    gcPenalty: metrics.gcPenalty,
    homopolymerPenalty: metrics.homopolymerPenalty,
    generation,
  };
}

/**
 * Initialize a diverse population of candidate chromosomes.
 * Always includes seed=0 (the raw/un-optimized original encoding) to show baseline!
 */
export function initializePopulation(rawBinary: string, popSize: number = 16): Chromosome[] {
  const population: Chromosome[] = [];

  // Candidate 0 is raw un-optimized encoding
  population.push(createChromosome(rawBinary, 0, 1));

  // Generate random candidate seeds
  const usedSeeds = new Set<number>([0]);
  while (population.length < popSize) {
    const seed = Math.floor(Math.random() * 1000000) + 1;
    if (!usedSeeds.has(seed)) {
      usedSeeds.add(seed);
      population.push(createChromosome(rawBinary, seed, 1));
    }
  }

  // Sort descending by fitness
  population.sort((a, b) => b.fitness - a.fitness);
  population.forEach((c, idx) => {
    c.rank = idx + 1;
  });

  return population;
}

/** Tournament selection: randomly pick k candidates and return the best */
function tournamentSelection(population: Chromosome[], tournamentSize: number = 3): Chromosome {
  let best = population[Math.floor(Math.random() * population.length)];
  for (let i = 1; i < tournamentSize; i++) {
    const challenger = population[Math.floor(Math.random() * population.length)];
    if (challenger.fitness > best.fitness) {
      best = challenger;
    }
  }
  return best;
}

/** Crossover two parent seeds to produce offspring */
function crossoverSeeds(seed1: number, seed2: number, crossoverRate: number): { child1: number; child2: number } {
  if (Math.random() > crossoverRate) {
    return { child1: seed1, child2: seed2 };
  }

  // Bitwise split and splice across 20-bit seed space
  const mask = (1 << (Math.floor(Math.random() * 16) + 4)) - 1;
  const child1 = ((seed1 & mask) | (seed2 & ~mask)) >>> 0;
  const child2 = ((seed2 & mask) | (seed1 & ~mask)) >>> 0;

  return {
    child1: child1 === 0 ? Math.floor(Math.random() * 999999) + 1 : child1,
    child2: child2 === 0 ? Math.floor(Math.random() * 999999) + 1 : child2,
  };
}

/** Mutate a seed with given mutation rate */
function mutateSeed(seed: number, mutationRate: number): number {
  if (Math.random() > mutationRate) {
    return seed;
  }
  // Flip a random bit or add small jitter
  const bitPos = Math.floor(Math.random() * 20);
  let mutated = (seed ^ (1 << bitPos)) >>> 0;
  if (mutated === 0) mutated = Math.floor(Math.random() * 999999) + 1;
  return mutated;
}

/**
 * Executes a single evolutionary generation step.
 * Returns the new population and history snapshot.
 */
export function evolveNextGeneration(
  currentPopulation: Chromosome[],
  rawBinary: string,
  currentGen: number,
  params: GAParameters
): { newPopulation: Chromosome[]; historyPoint: GenerationHistoryPoint } {
  const nextGen = currentGen + 1;
  const newPop: Chromosome[] = [];

  // Elitism: Preserve top 2 individuals without change
  const sorted = [...currentPopulation].sort((a, b) => b.fitness - a.fitness);
  const elite1 = { ...sorted[0], generation: nextGen, rank: 1 };
  const elite2 = { ...sorted[1], generation: nextGen, rank: 2 };
  newPop.push(elite1);
  if (params.populationSize > 1) {
    newPop.push(elite2);
  }

  // Produce offspring
  while (newPop.length < params.populationSize) {
    const parent1 = tournamentSelection(currentPopulation);
    const parent2 = tournamentSelection(currentPopulation);

    const { child1, child2 } = crossoverSeeds(parent1.keySeed, parent2.keySeed, params.crossoverRate);

    const mutatedChild1 = mutateSeed(child1, params.mutationRate);
    newPop.push(createChromosome(rawBinary, mutatedChild1, nextGen));

    if (newPop.length < params.populationSize) {
      const mutatedChild2 = mutateSeed(child2, params.mutationRate);
      newPop.push(createChromosome(rawBinary, mutatedChild2, nextGen));
    }
  }

  // Sort and rank
  newPop.sort((a, b) => b.fitness - a.fitness);
  newPop.forEach((c, idx) => {
    c.rank = idx + 1;
  });

  const best = newPop[0];
  const avgFitness =
    Math.round((newPop.reduce((acc, curr) => acc + curr.fitness, 0) / newPop.length) * 10) / 10;

  const historyPoint: GenerationHistoryPoint = {
    generation: nextGen,
    bestFitness: best.fitness,
    avgFitness,
    bestGcContent: best.gcContent,
    bestHomopolymer: best.longestHomopolymerLength,
    bestSequence: best.dnaSequence,
  };

  return { newPopulation: newPop, historyPoint };
}
