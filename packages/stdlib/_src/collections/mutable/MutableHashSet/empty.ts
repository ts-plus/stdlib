/**
 * Creates a new empty `MutableHashSet`.
 *
 * @tsplus static MutableHashSet/Ops empty
 */
export function empty<A>(): MutableHashSet<A> {
  return new MutableHashSet()
}
