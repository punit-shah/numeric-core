# numeric-core

Unofficial solver for the numeric core puzzle in Blue Prince.

**Potential spoilers ahead.** Stop reading here if you haven't come across the term "numeric core" in-game.

Using this package can reveal puzzle answers from Blue Prince. Recommended only if you don't enjoy manual numeric coring, or to check your answers.

Finds the numeric core of four numbers, or a four-letter word: the smallest whole number you can make by combining them with `+`, `-`, `*`, and `/`, worked out left to right.

## Install

```sh
npm install numeric-core
```

## Usage

```ts
import { numericCore, wordNumericCore, numberToLetter } from "numeric-core";

numericCore(8, 6, 45, 5);
// { value: 18, equation: "+ 8 - 6 * 45 / 5" }

const result = wordNumericCore("BEAD"); // B=2, E=5, A=1, D=4
// { value: 6, equation: "+ 2 * 5 / 1 - 4" }

numberToLetter(result.value); // "F"
```

## Numeric coring

- The first number always gets `+`. The other three get one of `-`, `*`, and `/` each, in the order that gives the smallest possible whole number answer.
- The equation is worked out left to right. `+ 8 - 6 * 45 / 5` is ((8 - 6) \* 45) / 5 = 18.
- The final answer has to be a whole number. If a whole number answer is not possible, the result is `null`.
- This code does not currently handle the case where the result is a number with more than three digits. In this case, you would need to split the result into four smaller numbers, and repeat the process with those numbers, until you get a result that is less than four digits.

## API

| Function                  | Returns              | Description                                                                                                               |
| ------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `numericCore(a, b, c, d)` | `CoreResult \| null` | The numeric core of the four numbers, or `null` if coring isn't possible.                                                 |
| `wordNumericCore(word)`   | `CoreResult \| null` | Turns each letter of a four-letter word into a number (A=1 ... Z=26) and cores them. Throws if `word` isn't four letters. |
| `letterToNumber(letter)`  | `number`             | Converts a letter to its position in the alphabet (A=1 ... Z=26).                                                         |
| `numberToLetter(number)`  | `string \| null`     | Converts a number to a letter (1=A ... 26=Z), or `null` if the number is outside 1-26.                                    |

`CoreResult` is `{ value: number; equation: string }`, where `value` is the numeric core and `equation` is the equation that produced it, e.g. `"+ 8 - 6 * 45 / 5"`.

## Disclaimer

This is a fan-made tool, and isn't affiliated with or endorsed by the makers of Blue Prince.
