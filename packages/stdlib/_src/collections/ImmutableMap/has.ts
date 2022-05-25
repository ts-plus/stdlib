/**
 * Returns `true` if the map contains the specified key, otherwise returns
 * `false`.
 *
 * @tsplus fluent ImmutableMap has
 */
export function has_<K, V>(self: ImmutableMap<K, V>, key: K): boolean {
  return self.internalMap.has(key)
}

/**
 * Returns `true` if the map contains the specified key, otherwise returns
 * `false`.
 *
 * @tsplus fluent ImmutableMap has
 */
export const has = Pipeable(has_)
