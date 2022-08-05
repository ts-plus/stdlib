/**
 * Mutates the `HashMap` within the context of the provided function.
 *
 * @tsplus static HashMap.Aspects mutate
 * @tsplus pipeable HashMap mutate
 */
export function mutate_<K, V>(f: (self: HashMap<K, V>) => void) {
  return (self: HashMap<K, V>): HashMap<K, V> => {
    const transient = self.beginMutation
    f(transient)
    return transient.endMutation
  }
}
