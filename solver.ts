/**
 * SPOILERS AHEAD
 * Do not read this file to avoid spoilers for specific in-game puzzles.
 *
 * Edit the values for `numerals` and `words`, then run with `npm run solver`.
 */

import { romanNumericCore, wordNumericCore } from "./numeric-core.ts";
import { numberToLetter } from "./utils.ts";

// Find the numeric core of a set of Roman numerals
const numerals: [string, string, string, string] = [
  // replace this with the numerals from the puzzle
  "XIV",
  "VII",
  "V",
  "II",
];

// Find the numeric cores of a grid of words, then translate the cores back to letters.
const words: string[][] = [
  // replace this with the grid of words from the puzzle
  ["WORD", "WORD", "WORD", "WORD", "WORD"],
  ["WORD", "WORD", "WORD", "WORD", "WORD"],
  ["WORD", "WORD", "WORD", "WORD", "WORD"],
  ["WORD", "WORD", "WORD", "WORD", "WORD"],
  ["WORD", "WORD", "WORD", "WORD", "WORD"],
];

const romanCore = romanNumericCore(...numerals);
console.log(`Roman numerals: ${numerals.join(", ")}`);
console.log(`Numeric core: ${romanCore ? romanCore.value : "no numeric core"}
`);

console.log("Grid of words ciphered with numeric cores:");
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
  console.log(`${set.join(" ")}: ${letters}`);
}
