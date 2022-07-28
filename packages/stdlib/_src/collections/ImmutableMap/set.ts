/**
 * Sets the specified key/value pair in the map.
 *
 * @tsplus static ImmutableMap.Aspects set
 * @tsplus pipeable ImmutableMap set
 */
export function set<K, V>(key: K, value: V) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const map = self.copy.internalMap as Map<K, V>
    map.set(key, value)
    return new ImmutableMap(map)
  }
}
