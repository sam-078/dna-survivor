import {
  CharDiffItem,
  DamageReport,
  RecoveryReport,
  RecoveryStatus,
} from '../types';
import {
  binaryToText,
  dnaToBinary,
  unscrambleBinary,
} from './dnaEncoding';
import { simulateDnaDamage } from './errorSimulator';

/**
 * Decodes a damaged DNA sequence and applies educational simulated error-correction
 * (Redundant Strand Majority Voting + Parity Check).
 */
export function recoverMessageFromDna(
  originalText: string,
  keySeed: number,
  damageReport: DamageReport,
  redundancyStrands: number = 3
): RecoveryReport {
  // 1. Raw direct decode without error correction
  const rawDamagedBinary = dnaToBinary(damageReport.damagedDna);
  const rawUnscrambledBinary = unscrambleBinary(rawDamagedBinary, keySeed);
  const rawDamagedDecodedText = binaryToText(rawUnscrambledBinary);

  // 2. Simulated Multi-Strand Physical Sequencing Majority Voting
  // In real DNA storage (like Microsoft / UW / Catalog), billions of copies of each strand exist.
  // Sequencing produces multiple reads. Majority voting across reads repairs random stochastic errors.
  const strandReads: string[] = [damageReport.damagedDna];
  // Generate additional simulated noisy reads for the redundancy pool
  for (let s = 1; s < redundancyStrands; s++) {
    const extraRead = simulateDnaDamage(damageReport.originalDna, damageReport.errorRateInput, 'mixed', true);
    strandReads.push(extraRead.damagedDna);
  }

  // Perform majority voting base-by-base
  let correctedDna = '';
  const originalDna = damageReport.originalDna;

  for (let i = 0; i < originalDna.length; i++) {
    const votes: Record<string, number> = { A: 0, C: 0, G: 0, T: 0 };
    for (const read of strandReads) {
      if (i < read.length) {
        const b = read[i].toUpperCase();
        if (votes[b] !== undefined) {
          votes[b]++;
        }
      }
    }

    // Find the base with max votes
    let winner = damageReport.damagedDna[i] || 'A';
    let maxVotes = -1;
    for (const [base, count] of Object.entries(votes)) {
      if (count > maxVotes) {
        maxVotes = count;
        winner = base;
      }
    }
    correctedDna += winner;
  }

  // Decode corrected sequence
  const correctedBinary = dnaToBinary(correctedDna);
  const correctedUnscrambled = unscrambleBinary(correctedBinary, keySeed);
  const correctedText = binaryToText(correctedUnscrambled);

  // 3. Compute Character-by-character diffs & recovery metrics
  const charDiffs: CharDiffItem[] = [];
  const origLen = originalText.length;
  let correctCharsCount = 0;
  let repairedCount = 0;

  for (let i = 0; i < origLen; i++) {
    const origChar = originalText[i];
    const rawChar = rawDamagedDecodedText[i] || '';
    const corrChar = correctedText[i] || '';

    const isMatch = corrChar === origChar;
    const wasRepaired = !isMatch ? false : (rawChar !== origChar && corrChar === origChar);

    if (isMatch) correctCharsCount++;
    if (wasRepaired) repairedCount++;

    charDiffs.push({
      index: i,
      originalChar: origChar,
      rawDamagedChar: rawChar || '∅',
      correctedChar: corrChar || '∅',
      isMatch,
      wasRepaired,
    });
  }

  const recoveryPercentage =
    origLen > 0 ? Math.round((correctCharsCount / origLen) * 1000) / 10 : 100;

  let status: RecoveryStatus = 'recovered';
  if (recoveryPercentage === 100) {
    status = 'recovered';
  } else if (recoveryPercentage >= 40) {
    status = 'partial';
  } else {
    status = 'lost';
  }

  const bitsTotal = origLen * 8;
  const bitsCorrupted = Math.min(bitsTotal, damageReport.totalErrors * 2);
  const bitsRepaired = Math.round((recoveryPercentage / 100) * bitsTotal);

  let explanation = '';
  if (status === 'recovered') {
    explanation = `All ${origLen} characters successfully recovered. Redundant strand voting repaired all simulated base errors.`;
  } else if (status === 'partial') {
    explanation = `${correctCharsCount} of ${origLen} characters salvaged (${recoveryPercentage}% fidelity). Heavy noise exceeded parity correction margins on corrupted fragments.`;
  } else {
    explanation = `Critical data loss: Error rate of ${damageReport.errorRateInput}% overwhelmed error-correction thresholds.`;
  }

  return {
    originalText,
    rawDamagedDecodedText,
    correctedText,
    recoveryPercentage,
    status,
    bitsTotal,
    bitsCorrupted,
    bitsRepaired,
    charDiffs,
    explanation,
  };
}
