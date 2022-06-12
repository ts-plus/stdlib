/**
 * Removes the key/value pair associated with the specified key from the map.
 *
 * @tsplus fluent ImmutableMap remove
 */
export function remove_<K, V>(self: ImmutableMap<K, V>, key: K): ImmutableMap<K, V> {
  const map = self.copy.internalMap as Map<K, V>
  map.delete(key)
  return new ImmutableMap(map)
}

/**
 * Removes the key/value pair associated with the specified key from the map.
 *
 * @tsplus static ImmutableMap/Aspects remove
 */
export const remove = Pipeable(remove_)
