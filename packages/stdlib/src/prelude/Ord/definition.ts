import type { Ordering } from "@tsplus/stdlib/prelude/Ordering/definition"

/**
 * `Ord[A]` provides implicit evidence that values of type `A` have a total
 * ordering.
 *
 * @tsplus type Ord
 */
export interface Ord<A> {
  readonly compare: (x: A, y: A) => Ordering
}

/**
 * @tsplus type OrdOps
 */
export interface OrdOps {}
export const Ord: OrdOps = {}
