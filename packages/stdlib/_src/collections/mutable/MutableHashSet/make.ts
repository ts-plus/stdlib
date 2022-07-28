/**
 * Construct a new `MutableHashSet` from a variable number of values.
 *
 * @tsplus static MutableHashSet.Ops __call
 * @tsplus static MutableHashSet.Ops make
 */
export function make<As extends any[]>(...elements: As): MutableHashSet<As[number]> {
  const set = MutableHashSet.empty<As[number]>()
  for (const value of elements) {
    set.add(value)
  }
  return set
}
