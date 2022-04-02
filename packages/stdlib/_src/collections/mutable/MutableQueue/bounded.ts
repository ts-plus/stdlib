import { Bounded } from "@tsplus/stdlib/collections/mutable/MutableQueue/_internal/Bounded";

/**
 * Creates a new bounded `MutableQueue`.
 *
 * @tsplus static MutableQueue/Ops bounded
 */
export function bounded<A>(n: number): MutableQueue<A> {
  return new Bounded(n);
}
