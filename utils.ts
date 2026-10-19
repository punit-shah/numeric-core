const ROMAN_DIGIT_VALUES = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
} as const;
export type RomanDigit = keyof typeof ROMAN_DIGIT_VALUES;

const isRomanDigit = (digit: string): digit is RomanDigit =>
  Object.hasOwn(ROMAN_DIGIT_VALUES, digit);

const romanDigitToNumber = (digit: string) => {
  if (!isRomanDigit(digit)) {
    throw new Error(`"${digit}" is not a Roman digit.`);
  }
  return ROMAN_DIGIT_VALUES[digit];
};

/**
 * Converts a Roman numeral to a number.
 */
export function romanToNumber(numeral: string): number {
  const values = [...numeral.toUpperCase()].map(romanDigitToNumber);

  let total = 0;
  for (const [i, value] of values.entries()) {
    const next = values[i + 1] ?? 0;
    const isSubtracted = value < next;
    total += isSubtracted ? -value : value;
  }
  return total;
}

/** Converts a letter to its position in the alphabet (A=1 ... Z=26) */
export function letterToNumber(letter: string): number {
  return letter.toUpperCase().charCodeAt(0) - 64;
}

/** Converts a number to a letter (1=A ... 26=Z), or `null` if the number is outside 1-26. */
export function numberToLetter(n: number): string | null {
  return n >= 1 && n <= 26 ? String.fromCharCode(64 + n) : null;
}
