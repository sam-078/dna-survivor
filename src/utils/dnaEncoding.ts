import { DnaBase, EncodedData, BaseMapping } from '../types';

export const BASE_MAPPINGS: Record<string, BaseMapping> = {
  '00': {
    bits: '00',
    base: 'A',
    name: 'Adenine',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300',
    borderColor: 'border-cyan-500',
  },
  '01': {
    bits: '01',
    base: 'C',
    name: 'Cytosine',
    color: 'text-amber-400',
    bgColor: 'bg-amber-950/60 border-amber-500/40 text-amber-300',
    borderColor: 'border-amber-500',
  },
  '10': {
    bits: '10',
    base: 'G',
    name: 'Guanine',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300',
    borderColor: 'border-emerald-500',
  },
  '11': {
    bits: '11',
    base: 'T',
    name: 'Thymine',
    color: 'text-rose-400',
    bgColor: 'bg-rose-950/60 border-rose-500/40 text-rose-300',
    borderColor: 'border-rose-500',
  },
};

export const BASE_TO_BITS: Record<DnaBase, string> = {
  A: '00',
  C: '01',
  G: '10',
  T: '11',
};

export const BASE_COLORS: Record<DnaBase, { badge: string; dot: string; text: string; bg: string }> = {
  A: {
    badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    dot: 'bg-cyan-400',
    text: 'text-cyan-400',
    bg: 'bg-cyan-950/40',
  },
  T: {
    badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    dot: 'bg-rose-400',
    text: 'text-rose-400',
    bg: 'bg-rose-950/40',
  },
  C: {
    badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    dot: 'bg-amber-400',
    text: 'text-amber-400',
    bg: 'bg-amber-950/40',
  },
  G: {
    badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    dot: 'bg-emerald-400',
    text: 'text-emerald-400',
    bg: 'bg-emerald-950/40',
  },
};

/** Convert UTF-8 string to binary string (8 bits per character) */
export function textToBinary(text: string): string {
  if (!text) return '';
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += bytes[i].toString(2).padStart(8, '0');
  }
  return binary;
}

/** Convert binary string back to UTF-8 text */
export function binaryToText(binary: string): string {
  if (!binary) return '';
  const bytes: number[] = [];
  // Process each 8-bit chunk
  for (let i = 0; i < binary.length; i += 8) {
    const chunk = binary.slice(i, i + 8);
    if (chunk.length === 8) {
      bytes.push(parseInt(chunk, 2));
    }
  }
  const decoder = new TextDecoder('utf-8', { fatal: false });
  try {
    return decoder.decode(new Uint8Array(bytes));
  } catch {
    // Fallback for corrupted characters
    return bytes.map((b) => (b >= 32 && b <= 126 ? String.fromCharCode(b) : '')).join('');
  }
}

/** Convert binary string to DNA sequence (2 bits per base) */
export function binaryToDna(binary: string): string {
  let dna = '';
  // Ensure even length
  const paddedBinary = binary.length % 2 !== 0 ? binary + '0' : binary;
  for (let i = 0; i < paddedBinary.length; i += 2) {
    const pair = paddedBinary.slice(i, i + 2);
    dna += BASE_MAPPINGS[pair]?.base || 'A';
  }
  return dna;
}

/** Convert DNA sequence to binary string */
export function dnaToBinary(dna: string): string {
  let binary = '';
  for (let i = 0; i < dna.length; i++) {
    const base = dna[i].toUpperCase() as DnaBase;
    binary += BASE_TO_BITS[base] || '00';
  }
  return binary;
}

/** Calculate GC content % */
export function calculateGcContent(dna: string): number {
  if (!dna.length) return 0;
  let gcCount = 0;
  for (let i = 0; i < dna.length; i++) {
    const char = dna[i].toUpperCase();
    if (char === 'G' || char === 'C') {
      gcCount++;
    }
  }
  return Math.round((gcCount / dna.length) * 1000) / 10; // 1 decimal place
}

/** Find longest homopolymer (consecutive identical nucleotides) */
export function findLongestHomopolymer(dna: string): { base: DnaBase | ''; length: number } {
  if (!dna.length) return { base: '', length: 0 };
  let maxLen = 1;
  let maxBase: DnaBase = dna[0].toUpperCase() as DnaBase;
  let currentLen = 1;
  let currentBase = dna[0].toUpperCase() as DnaBase;

  for (let i = 1; i < dna.length; i++) {
    const b = dna[i].toUpperCase() as DnaBase;
    if (b === currentBase) {
      currentLen++;
      if (currentLen > maxLen) {
        maxLen = currentLen;
        maxBase = b;
      }
    } else {
      currentBase = b;
      currentLen = 1;
    }
  }
  return { base: maxBase, length: maxLen };
}

/** Calculate base frequency counts */
export function countBases(dna: string): Record<DnaBase, number> {
  const counts: Record<DnaBase, number> = { A: 0, T: 0, C: 0, G: 0 };
  for (let i = 0; i < dna.length; i++) {
    const b = dna[i].toUpperCase() as DnaBase;
    if (counts[b] !== undefined) {
      counts[b]++;
    }
  }
  return counts;
}

/** Comprehensive encoding info package */
export function encodeTextMessage(text: string): EncodedData {
  const binary = textToBinary(text);
  const dna = binaryToDna(binary);
  const gc = calculateGcContent(dna);
  const homopolymer = findLongestHomopolymer(dna);
  const baseCounts = countBases(dna);

  return {
    originalText: text,
    binaryString: binary,
    dnaSequence: dna,
    bitCount: binary.length,
    baseCount: dna.length,
    gcContent: gc,
    longestHomopolymer: homopolymer,
    baseCounts,
  };
}

/**
 * Scrambler transformation:
 * Applies a reversible pseudo-random bitmask (derived from integer seed) to binary string.
 * This simulates how modern DNA storage fountains/scramblers prevent homopolymers.
 */
export function scrambleBinary(binary: string, seed: number): string {
  if (seed === 0) return binary;
  let result = '';
  // Linear congruential generator for reproducible mask
  let state = (seed * 1103515245 + 12345) >>> 0;
  for (let i = 0; i < binary.length; i++) {
    state = (state * 1103515245 + 12345) >>> 0;
    const maskBit = (state >>> 16) & 1;
    const bit = parseInt(binary[i], 10);
    result += (bit ^ maskBit).toString();
  }
  return result;
}

/**
 * Inverse scrambler (XOR is its own inverse)
 */
export function unscrambleBinary(scrambledBinary: string, seed: number): string {
  return scrambleBinary(scrambledBinary, seed);
}
