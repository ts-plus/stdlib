/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @tsplus fluent HashSet mutate
 */
export function mutate_<A>(self: HashSet<A>, f: (set: HashSet<A>) => void): HashSet<A> {
  const transient = self.beginMutation
  f(transient)
  return transient.endMutation
}

/**
 * Mutates the `HashSet` within the context of the provided function.
 *
 * @tsplus static HashSet/Aspects mutate
 */
export const mutate = Pipeable(mutate_)
