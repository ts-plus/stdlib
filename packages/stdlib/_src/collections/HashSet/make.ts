/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @tsplus static HashSet/Ops __call
 */
export function make<A>(...elements: Array<A>): HashSet<A> {
  const set = HashSet.empty<A>().beginMutation
  for (const v of elements) {
    set.add(v)
  }
  return set.endMutation
}
