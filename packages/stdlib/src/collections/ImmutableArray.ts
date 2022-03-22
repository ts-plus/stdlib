import type { Iterable } from "@tsplus/stdlib/collections/Iterable"
import { Equals } from "@tsplus/stdlib/structure/Equals"
import { Hash } from "@tsplus/stdlib/structure/Hash"

declare global {
  /**
   * @tsplus type Array
   */
  export interface Array<T> {}
}

/**
 * @tsplus type ImmutableArray
 * @tsplus companion ImmutableArrayOps
 */
export class ImmutableArray<A> implements Equals {
  constructor(readonly array: ReadonlyArray<A>) {}

  [Equals.sym](this: this, other: unknown): boolean {
    return (
      other instanceof ImmutableArray &&
      this.array.length === other.array.length &&
      this.array.every((v, i) => Equals.equals(v, other.array[i]))
    )
  }
  [Hash.sym](this: this): number {
    return Hash.array(this.array)
  }
}

/**
 * @tsplus type ImmutableArrayOps
 */
export interface ReadonlyArrayOps {}

/**
 * @tsplus static ImmutableArrayOps __call
 * @tsplus static ImmutableArrayOps make
 */
export function make<A extends readonly any[]>(...as: A): ImmutableArray<A[number]> {
  return new ImmutableArray(as)
}

/**
 * @tsplus static ImmutableArrayOps from
 */
export function from<A>(iterable: Iterable<A>): ImmutableArray<A> {
  return new ImmutableArray(Array.from(iterable))
}

/**
 * @tsplus fluent ImmutableArray map
 */
export function map_<A, B>(
  i: ImmutableArray<A>,
  f: (a: A, k: number) => B
): ImmutableArray<B> {
  return new ImmutableArray(i.array.map(f))
}

export const map = Pipeable(map_)

/**
 * @tsplus fluent Array immutable
 */
export function immutable<A>(self: Array<A>): ImmutableArray<A> {
  return new ImmutableArray(self.slice(0, self.length))
}
