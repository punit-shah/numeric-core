import { wordNumericCore } from "./numeric-core.ts";
import { numberToLetter } from "./utils.ts";

/**
 * SPOILERS AHEAD
 * Do not read this file to avoid potential spoilers for in-game puzzles.
 *
 * This script finds the numeric cores of a grid of words, translated back to letters.
 *
 * Run with `npm run words`.
 */

// fill this in with the grid of words from the puzzle
const words: string[][] = [
  ["word", "word", "word", "word", "word"],
  ["word", "word", "word", "word", "word"],
  ["word", "word", "word", "word", "word"],
  ["word", "word", "word", "word", "word"],
  ["word", "word", "word", "word", "word"],
];

for (const set of words) {
  let letters = "";
  for (const word of set) {
    const result = wordNumericCore(word);
    if (!result) {
      console.log(`${word}: no numeric core`);
      continue;
    }
    const letter = numberToLetter(result.value) ?? "?";
    letters = letters.concat(letter);
  }
  console.log(`${set}: ${letters}`);
}
