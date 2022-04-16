/**
 * Sets the specified key/value pair in the map.
 *
 * @tsplus fluent ImmutableMap set
 */
export function set_<K, V>(self: ImmutableMap<K, V>, key: K, value: V): ImmutableMap<K, V> {
  const map = self.copy().internalMap as Map<K, V>;
  map.set(key, value);
  return new ImmutableMap(map);
}

/**
 * Sets the specified key/value pair in the map.
 *
 * @tsplus static ImmutableMap/Aspects set
 */
export const set = Pipeable(set_);
