export type DnaBase = 'A' | 'T' | 'C' | 'G';

export interface BaseMapping {
  bits: string;
  base: DnaBase;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export interface EncodedData {
  originalText: string;
  binaryString: string;
  dnaSequence: string;
  bitCount: number;
  baseCount: number;
  gcContent: number; // 0 to 100
  longestHomopolymer: {
    base: DnaBase | '';
    length: number;
  };
  baseCounts: Record<DnaBase, number>;
}

export interface Chromosome {
  id: string;
  keySeed: number; // Seed/permutation rule used for encoding transformation
  dnaSequence: string;
  gcContent: number;
  longestHomopolymerLength: number;
  homopolymerBase: DnaBase | '';
  fitness: number; // 0 to 100
  gcPenalty: number;
  homopolymerPenalty: number;
  generation: number;
  rank?: number;
}

export interface GAParameters {
  populationSize: number; // default 16
  maxGenerations: number; // default 15
  mutationRate: number; // 0.05 to 0.50, default 0.15
  crossoverRate: number; // 0.50 to 0.95, default 0.75
  redundancyStrands: number; // 3 or 5 strands for majority voting
}

export interface GenerationHistoryPoint {
  generation: number;
  bestFitness: number;
  avgFitness: number;
  bestGcContent: number;
  bestHomopolymer: number;
  bestSequence: string;
}

export type NoiseType = 'substitution' | 'insertion' | 'deletion' | 'mixed';

export interface DamagedBaseInfo {
  originalIndex: number;
  damagedIndex: number;
  originalBase: string;
  damagedBase: string;
  isError: boolean;
  errorType?: 'substitution' | 'insertion' | 'deletion';
}

export interface DamageReport {
  originalDna: string;
  damagedDna: string;
  errorRateInput: number; // percentage, e.g. 5
  totalErrors: number;
  errorCountSubstitutions: number;
  errorCountInsertions: number;
  errorCountDeletions: number;
  damagedBases: DamagedBaseInfo[];
  affectedBasesPercentage: number;
}

export type RecoveryStatus = 'recovered' | 'partial' | 'lost';

export interface CharDiffItem {
  index: number;
  originalChar: string;
  rawDamagedChar: string;
  correctedChar: string;
  isMatch: boolean;
  wasRepaired: boolean;
}

export interface RecoveryReport {
  originalText: string;
  rawDamagedDecodedText: string;
  correctedText: string;
  recoveryPercentage: number; // 0 - 100%
  status: RecoveryStatus;
  bitsTotal: number;
  bitsCorrupted: number;
  bitsRepaired: number;
  charDiffs: CharDiffItem[];
  explanation: string;
}

export interface ComparisonResult {
  raw: {
    name: string;
    dnaSequence: string;
    fitness: number;
    gcContent: number;
    homopolymerLen: number;
    errorRate: number;
    errorsIntroduced: number;
    recoveryPercentage: number;
    status: RecoveryStatus;
    recoveredText: string;
  };
  ga: {
    name: string;
    dnaSequence: string;
    fitness: number;
    gcContent: number;
    homopolymerLen: number;
    errorRate: number;
    errorsIntroduced: number;
    recoveryPercentage: number;
    status: RecoveryStatus;
    recoveredText: string;
  };
}

export interface ResearchChartDataPoint {
  errorRate: number; // e.g. 0, 1, 2, 3, 4, 5, 7, 10, 12, 15
  rawRecovery: number; // 0-100
  gaRecovery: number; // 0-100
}

export type SimulationStep = 'encode' | 'evolve' | 'damage' | 'recover' | 'compare' | 'research' | 'ppt' | 'references';
