/**
 * Construct a new `MutableHashSet` from a variable number of values.
 *
 * @tsplus static MutableHashSet/Ops __call
 */
export function make<A>(...elements: Array<A>): MutableHashSet<A> {
  const set = MutableHashSet.empty<A>()
  for (const value of elements) {
    set.add(value)
  }
  return set
}
