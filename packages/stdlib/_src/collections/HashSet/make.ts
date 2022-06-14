/**
 * Construct a new `HashSet` from a variable number of values.
 *
 * @tsplus static HashSet/Ops __call
 * @tsplus static HashSet/Ops make
 */
export function make<As extends readonly any[]>(...elements: As): HashSet<As[number]> {
  const set = HashSet.empty<As[number]>().beginMutation
  for (const v of elements) {
    set.add(v)
  }
  return set.endMutation
}
