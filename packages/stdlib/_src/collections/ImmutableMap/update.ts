/**
 * Update a mapping for the specified key and its current optionally-mapped
 * value (`Some` if there is current mapping, `None` if not).
 *
 * - If the key/value pair already exists within the map, the key/value pair is
 *   removed.
 * - If the remapping function returns `Some(v)`, the mapping is updated with
 *   the new value `v`.
 * - If the remapping function returns `None`, the mapping is removed (or
 *   remains absent if initially absent).
 *
 * @tsplus static ImmutableMap.Aspects update
 * @tsplus pipeable ImmutableMap update
 */
export function update<K, V>(key: K, f: (value: Maybe<V>) => Maybe<V>) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, V> => {
    const previousValue = Maybe.fromNullable(self.internalMap.get(key))
    const nextValue = f(previousValue)
    if (previousValue.isSome()) {
      return self.remove(key)
    }
    if (nextValue.isSome()) {
      return self.set(key, nextValue.value)
    }
    return self
  }
}
