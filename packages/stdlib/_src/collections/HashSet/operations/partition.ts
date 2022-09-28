/**
 * Partition the values of a `HashSet` using the specified predicate.
 *
 * If a value matches the predicate, it will be placed into the `HashSet` on the
 * right side of the resulting `Tuple`, otherwise the value will be placed into
 * the left side.
 *
 * @tsplus static HashSet.Aspects partition
 * @tsplus pipeable HashSet partition
 */
export function partition<A, B extends A>(
  f: Refinement<A, B>
): (self: HashSet<A>) => readonly [HashSet<A>, HashSet<B>]
export function partition<A>(
  f: Predicate<A>
): (self: HashSet<A>) => readonly [HashSet<A>, HashSet<A>]
export function partition<A>(
  f: Predicate<A>
) {
  return (self: HashSet<A>): readonly [HashSet<A>, HashSet<A>] => {
    const vs = self.values
    let e: IteratorResult<A, any>
    const right = HashSet.empty<A>().beginMutation
    const left = HashSet.empty<A>().beginMutation
    while (!(e = vs.next()).done) {
      const value = e.value
      if (f(value)) {
        right.add(value)
      } else {
        left.add(value)
      }
    }
    return [left.endMutation, right.endMutation]
  }
}
