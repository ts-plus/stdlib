/**
 * Construct a new `MutableHashSet` from a `Collection` of values
 *
 * @tsplus static MutableHashSet/Ops from
 */
export function from<A>(elements: Collection<A>): MutableHashSet<A> {
  const set = MutableHashSet.empty<A>();
  for (const value of elements) {
    set.add(value);
  }
  return set;
}
