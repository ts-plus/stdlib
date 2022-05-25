import { Unbounded } from "@tsplus/stdlib/collections/mutable/MutableQueue/_internal/Unbounded"

/**
 * Creates a new unbounded `MutableQueue`.
 *
 * @tsplus static MutableQueue/Ops unbounded
 */
export function unbounded<A>(): MutableQueue<A> {
  return new Unbounded()
}
