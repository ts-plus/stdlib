/**
 * Mutates the `HashMap` within the context of the provided function.
 *
 * @tsplus fluent HashMap mutate
 */
export function mutate_<K, V>(
  self: HashMap<K, V>,
  f: (self: HashMap<K, V>) => void
): HashMap<K, V> {
  const transient = self.beginMutation()
  f(transient)
  return transient.endMutation()
}

/**
 * Mutates the `HashMap` within the context of the provided function.
 *
 * @tsplus static HashMap/Aspects mutate
 */
export const mutate = Pipeable(mutate_)
