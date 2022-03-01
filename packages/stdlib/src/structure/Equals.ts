import type { Hash } from "./Hash.js"
import { hashUnknown, isHash } from "./Hash.js"

export const equalsSym = Symbol.for("tsplus/Equals")

/**
 * @tsplus type Equals
 */
export interface Equals extends Hash {
  [equalsSym](this: this, other: unknown): boolean
}

export function isEquals(u: unknown): u is Equals {
  return isHash(u) && equalsSym in u
}

export function sameValueZeroEqual(a: any, b: any) {
  return a === b || (a !== a && b !== b)
}

export function equals(a: unknown, b: unknown): boolean {
  if (!sameValueZeroEqual(hashUnknown(a), hashUnknown(b))) {
    return false
  } else if (isEquals(a)) {
    return a[equalsSym](b)
  } else if (isEquals(b)) {
    return b[equalsSym](a)
  }
  return sameValueZeroEqual(a, b)
}
