import { DnaBase, DamageReport, DamagedBaseInfo, NoiseType } from '../types';

const DNA_BASES: DnaBase[] = ['A', 'C', 'G', 'T'];

/**
 * Simulates real-world biochemical damage (substitution, insertion, deletion).
 * DNA strands with long homopolymer runs suffer an elevated error probability,
 * mirroring real-life enzymatic sequencing slippage (e.g. Illumina & Nanopore).
 */
export function simulateDnaDamage(
  dna: string,
  errorRatePercentage: number,
  noiseType: NoiseType = 'mixed',
  bioFragilityBoost: boolean = true
): DamageReport {
  if (!dna || errorRatePercentage <= 0) {
    const defaultBases: DamagedBaseInfo[] = dna.split('').map((base, idx) => ({
      originalIndex: idx,
      damagedIndex: idx,
      originalBase: base,
      damagedBase: base,
      isError: false,
    }));
    return {
      originalDna: dna,
      damagedDna: dna,
      errorRateInput: errorRatePercentage,
      totalErrors: 0,
      errorCountSubstitutions: 0,
      errorCountInsertions: 0,
      errorCountDeletions: 0,
      damagedBases: defaultBases,
      affectedBasesPercentage: 0,
    };
  }

  const baseRate = errorRatePercentage / 100;
  const originalChars = dna.split('');
  const damagedBases: DamagedBaseInfo[] = [];

  let totalErrors = 0;
  let errorSubstitutions = 0;
  let errorInsertions = 0;
  let errorDeletions = 0;

  let currentDamagedIndex = 0;

  for (let i = 0; i < originalChars.length; i++) {
    const origBase = originalChars[i].toUpperCase() as DnaBase;

    // Check if this base is inside a homopolymer run (same as predecessor)
    const isHomopolymer =
      (i > 0 && originalChars[i] === originalChars[i - 1]) ||
      (i < originalChars.length - 1 && originalChars[i] === originalChars[i + 1]);

    // Homopolymers suffer 1.5x - 2.5x error amplification in biological synthesis/reading
    const localErrorProb = bioFragilityBoost && isHomopolymer
      ? Math.min(0.95, baseRate * 1.8)
      : baseRate;

    const willError = Math.random() < localErrorProb;

    if (!willError) {
      // Normal copy
      damagedBases.push({
        originalIndex: i,
        damagedIndex: currentDamagedIndex++,
        originalBase: origBase,
        damagedBase: origBase,
        isError: false,
      });
    } else {
      totalErrors++;
      // Determine error category
      let chosenType: 'substitution' | 'insertion' | 'deletion' = 'substitution';
      if (noiseType === 'mixed') {
        const roll = Math.random();
        if (roll < 0.70) chosenType = 'substitution'; // 70% substitutions
        else if (roll < 0.85) chosenType = 'insertion'; // 15% insertions
        else chosenType = 'deletion'; // 15% deletions
      } else if (noiseType === 'substitution') {
        chosenType = 'substitution';
      } else if (noiseType === 'insertion') {
        chosenType = 'insertion';
      } else if (noiseType === 'deletion') {
        chosenType = 'deletion';
      }

      if (chosenType === 'substitution') {
        errorSubstitutions++;
        // Mutate to a different base
        const otherBases = DNA_BASES.filter((b) => b !== origBase);
        const mutatedBase = otherBases[Math.floor(Math.random() * otherBases.length)];
        damagedBases.push({
          originalIndex: i,
          damagedIndex: currentDamagedIndex++,
          originalBase: origBase,
          damagedBase: mutatedBase,
          isError: true,
          errorType: 'substitution',
        });
      } else if (chosenType === 'insertion') {
        errorInsertions++;
        // An extra random base gets inserted before or with current base
        const insertedBase = DNA_BASES[Math.floor(Math.random() * DNA_BASES.length)];
        // Add original
        damagedBases.push({
          originalIndex: i,
          damagedIndex: currentDamagedIndex++,
          originalBase: origBase,
          damagedBase: origBase,
          isError: false,
        });
        // Add inserted noise base
        damagedBases.push({
          originalIndex: i,
          damagedIndex: currentDamagedIndex++,
          originalBase: '—',
          damagedBase: insertedBase,
          isError: true,
          errorType: 'insertion',
        });
      } else if (chosenType === 'deletion') {
        errorDeletions++;
        // Base is dropped/skipped
        damagedBases.push({
          originalIndex: i,
          damagedIndex: -1, // deleted
          originalBase: origBase,
          damagedBase: '—',
          isError: true,
          errorType: 'deletion',
        });
      }
    }
  }

  // Construct final damaged sequence
  const damagedDna = damagedBases
    .filter((b) => b.damagedBase !== '—')
    .map((b) => b.damagedBase)
    .join('');

  const affectedBasesPercentage =
    dna.length > 0 ? Math.round((totalErrors / dna.length) * 1000) / 10 : 0;

  return {
    originalDna: dna,
    damagedDna,
    errorRateInput: errorRatePercentage,
    totalErrors,
    errorCountSubstitutions: errorSubstitutions,
    errorCountInsertions: errorInsertions,
    errorCountDeletions: errorDeletions,
    damagedBases,
    affectedBasesPercentage,
  };
}
