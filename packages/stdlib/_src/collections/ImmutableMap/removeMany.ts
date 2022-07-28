/**
 * Removes all key/value pairs associated with the keys in the specified
 * collection from the map.
 *
 * @tsplus static ImmutableMap.Aspects removeMany
 * @tsplus pipeable ImmutableMap removeMany
 */
export function removeMany<K>(keys: Collection<K>) {
  return <V>(self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const map = self.copy.internalMap as Map<K, V>
    for (const key of keys) {
      map.delete(key)
    }
    return new ImmutableMap(map)
  }
}
