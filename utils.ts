/** A=1 … Z=26. */
export function letterToNumber(letter: string): number {
  return letter.toUpperCase().charCodeAt(0) - 64;
}

/** 1=A … 26=Z; anything outside that range has no letter. */
export function numberToLetter(n: number): string | null {
  return n >= 1 && n <= 26 ? String.fromCharCode(64 + n) : null;
}
