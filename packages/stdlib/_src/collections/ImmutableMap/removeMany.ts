/**
 * Removes all key/value pairs associated with the keys in the specified
 * collection from the map.
 *
 * @tsplus fluent ImmutableMap removeMany
 */
export function removeMany_<K, V>(self: ImmutableMap<K, V>, keys: Collection<K>): ImmutableMap<K, V> {
  const map = self.copy().internalMap as Map<K, V>;
  for (const key of keys) {
    map.delete(key);
  }
  return new ImmutableMap(map);
}

/**
 * Removes all key/value pairs associated with the keys in the specified
 * collection from the map.
 *
 * @tsplus static ImmutableMap/Aspects removeMany
 */
export const removeMany = Pipeable(removeMany_);
