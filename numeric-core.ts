import { letterToNumber } from "./utils.ts";

type Operator = "+" | "-" | "*" | "/";
type OperatorOrder = [Operator, Operator, Operator];

// the first number is always "+" - possible orders for the other three operators
const OPERATOR_ORDERS: OperatorOrder[] = [
  ["-", "*", "/"],
  ["-", "/", "*"],
  ["*", "-", "/"],
  ["*", "/", "-"],
  ["/", "-", "*"],
  ["/", "*", "-"],
];

// steps can pass through fractions (e.g. 7 / 14 * 4)
type Fraction = { numerator: number; denominator: number };

function applyStep(total: Fraction, op: Operator, n: number): Fraction | null {
  const { numerator, denominator } = total;
  switch (op) {
    case "+":
      return { numerator: numerator + n * denominator, denominator };
    case "-":
      // return null if the step would go negative
      if (numerator < n * denominator) return null;
      return { numerator: numerator - n * denominator, denominator };
    case "*":
      return { numerator: numerator * n, denominator };
    case "/":
      // return null if the step would divide by zero
      if (n === 0) return null;
      return { numerator, denominator: denominator * n };
  }
}

/**
 * Works out `+ a op1 b op2 c op3 d` from left to right.
 * null is returned if there is an invalid step or the answer is not a whole number.
 */
function evaluate(
  [a, b, c, d]: [number, number, number, number],
  [op1, op2, op3]: OperatorOrder,
): number | null {
  const steps: [Operator, number][] = [
    [op1, b],
    [op2, c],
    [op3, d],
  ];

  let total: Fraction | null = { numerator: a, denominator: 1 };
  for (const [op, n] of steps) {
    total = applyStep(total, op, n);
    if (total === null) return null;
  }

  const isWhole = total.numerator % total.denominator === 0;
  return isWhole ? total.numerator / total.denominator : null;
}

export type CoreResult = {
  /** The value of the numeric core. */
  value: number;
  /** The equation that gave the numeric core value. */
  equation: string;
};

/**
 * Tries every operator order and returns the smallest whole-number answer,
 * or null if a whole number answer is not possible.
 */
export function numericCore(
  a: number,
  b: number,
  c: number,
  d: number,
): CoreResult | null {
  let best: CoreResult | null = null;

  for (const order of OPERATOR_ORDERS) {
    const value = evaluate([a, b, c, d], order);
    if (value === null) continue;

    if (best === null || value < best.value) {
      const [op1, op2, op3] = order;
      const equation = `+ ${a} ${op1} ${b} ${op2} ${c} ${op3} ${d}`;
      best = { value, equation };
    }
  }

  return best;
}

/** Turns each letter of a 4-letter word into a number and finds the core. */
export function wordNumericCore(word: string): CoreResult | null {
  if (!/^[a-z]{4}$/i.test(word)) {
    throw new Error(`"${word}" is not a 4-letter word.`);
  }
  return numericCore(
    letterToNumber(word.charAt(0)),
    letterToNumber(word.charAt(1)),
    letterToNumber(word.charAt(2)),
    letterToNumber(word.charAt(3)),
  );
}
