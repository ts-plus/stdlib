import type { Hash } from "./Hash.js"
import { hashUnknown, isHash } from "./Hash.js"

/**
 * @tsplus type EqualsOps
 */
export interface EqualsOps {
  readonly sym: unique symbol
}

export const Equals: EqualsOps = {
  sym: Symbol.for("tsplus/Equals") as EqualsOps["sym"]
}

/**
 * @tsplus type Equals
 */
export interface Equals extends Hash {
  [Equals.sym](this: this, other: unknown): boolean
}

/**
 * @tsplus static EqualsOps isEquals
 */
export function isEquals(u: unknown): u is Equals {
  return isHash(u) && Equals.sym in u
}

/**
 * @tsplus static EqualsOps sameValueZeroEqual
 */
export function sameValueZeroEqual(a: any, b: any) {
  return a === b || (a !== a && b !== b)
}

/**
 * @tsplus static EqualsOps equals
 */
export function equals(a: unknown, b: unknown): boolean {
  if (!sameValueZeroEqual(hashUnknown(a), hashUnknown(b))) {
    return false
  } else if (isEquals(a)) {
    return a[Equals.sym](b)
  } else if (isEquals(b)) {
    return b[Equals.sym](a)
  }
  return sameValueZeroEqual(a, b)
}
