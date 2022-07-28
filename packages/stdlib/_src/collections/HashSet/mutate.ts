/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @tsplus static HashSet.Aspects mutate
 * @tsplus pipeable HashSet mutate
 */
export function mutate<A>(f: (set: HashSet<A>) => void) {
  return (self: HashSet<A>): HashSet<A> => {
    const transient = self.beginMutation
    f(transient)
    return transient.endMutation
  }
}
