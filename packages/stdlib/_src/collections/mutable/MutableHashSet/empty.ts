/**
 * Creates a new empty `MutableHashSet`.
 *
 * @tsplus static MutableHashSet.Ops empty
 */
export function empty<A = never>(): MutableHashSet<A> {
  return new MutableHashSet()
}
