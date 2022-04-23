/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus fluent ImmutableMap unsafeGet
 */
export function unsafeGet_<K, V>(self: ImmutableMap<K, V>, key: K): V {
  if (!self.internalMap.has(key)) {
    throw new NoSuchElement();
  }
  return self.internalMap.get(key)!;
}

/**
 * Returns a `Some` containing the value associated with the specified key from
 * the map, or `None` if the key/value pair is not present within the map.
 *
 * @tsplus fluent ImmutableMap unsafeGet
 */
export const unsafeGet = Pipeable(unsafeGet_);
