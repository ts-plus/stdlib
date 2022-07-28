/**
 * Removes the key/value pair associated with the specified key from the map.
 *
 * @tsplus static ImmutableMap.Aspects remove
 * @tsplus pipeable ImmutableMap remove
 */
export function remove<K>(key: K) {
  return <V>(self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const map = self.copy.internalMap as Map<K, V>
    map.delete(key)
    return new ImmutableMap(map)
  }
}
