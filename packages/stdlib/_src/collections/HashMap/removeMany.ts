/**
 * Removes all entries in the `HashMap` which have the specified keys.
 *
 * @tsplus static HashMap.Aspects removeMany
 * @tsplus pipeable HashMap removeMany
 */
export function removeMany<K>(ks: Iterable<K>) {
  return <V>(self: HashMap<K, V>): HashMap<K, V> =>
    self.mutate((m) => {
      for (const k of ks) {
        m.remove(k)
      }
    })
}
