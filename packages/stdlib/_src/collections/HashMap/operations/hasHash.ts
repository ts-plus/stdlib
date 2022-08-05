/**
 * Checks if the specified key has an entry in the `HashMap` using a custom
 * hash.
 *
 * @tsplus static HashMap.Aspects hasHash
 * @tsplus pipeable HashMap hasHash
 */
export function hasHash<K, V>(key: K, hash: number) {
  return (self: HashMap<K, V>): boolean => self.getHash(key, hash).isSome()
}
