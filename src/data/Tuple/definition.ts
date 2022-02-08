import type { Equals } from "../../structure/Equals.js"
import { equals, equalsSym } from "../../structure/Equals.js"
import * as Hash from "../../structure/Hash.js"

export const TupleSym: unique symbol = Symbol.for("tsplus/Tuple")
export type TupleSym = typeof TupleSym

/**
 * A `Tuple` represents an immutable, finite ordered sequence of elements.
 *
 * @tsplus type tsplus/Tuple
 */
export interface Tuple<T extends ReadonlyArray<unknown>>
  extends Iterable<T[number]>,
    Equals {
  readonly [TupleSym]: TupleSym

  [Symbol.iterator](): IterableIterator<T[number]>

  tuple: T

  [Hash.hashSym](): number
  [equalsSym](that: unknown): boolean

  get<K extends keyof T>(i: K): T[K]
}

export class TupleInternal<T extends readonly unknown[]> implements Tuple<T> {
  readonly [TupleSym]: TupleSym = TupleSym

  constructor(readonly tuple: T) {}

  [Symbol.iterator](): IterableIterator<T[number]> {
    return this.tuple[Symbol.iterator]()
  }

  [Hash.hashSym](): number {
    return Hash.hashArray(this.tuple)
  }

  [equalsSym](that: unknown): boolean {
    if (isTuple(that)) {
      return (
        this.tuple.length === that.tuple.length &&
        this.tuple.every((v, i) => equals(v, that.tuple[i]))
      )
    }
    return false
  }

  get<K extends keyof T>(i: K): T[K] {
    return this.tuple[i]
  }
}

/**
 * @tsplus type tsplus/TupleOps
 */
export interface TupleOps {}
export const Tuple: TupleOps = {}

/**
 * @tsplus unify tsplus/Tuple
 */
export function unifyTuple<X extends Tuple<any>>(
  self: X
): Tuple<[X] extends [Tuple<infer A>] ? A : never> {
  return self
}

/**
 * Checks if the provided value is a `Tuple`.
 *
 * @tsplus static tsplus/TupleOps isTuple
 */
export function isTuple(self: unknown): self is Tuple<unknown[]> {
  return typeof self === "object" && self != null && TupleSym in self
}
