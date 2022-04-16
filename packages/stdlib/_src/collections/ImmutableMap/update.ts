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
 * @tsplus fluent ImmutableMap update
 */
export function update_<K, V>(
  self: ImmutableMap<K, V>,
  key: K,
  f: (value: Option<V>) => Option<V>
): ImmutableMap<K, V> {
  const previousValue = Option.fromNullable(self.internalMap.get(key));
  const nextValue = f(previousValue);
  if (previousValue.isSome()) {
    return self.remove(key);
  }
  if (nextValue.isSome()) {
    return self.set(key, nextValue.value);
  }
  return self;
}

/**
 * Update a mapping for the specified key and its current optionally-mapped
 * value (`Some` if there is current mapping, `None` if not).
 *
 * - If the remapping function returns `Some(v)`, the mapping is updated with
 *   the new value `v`.
 * - If the remapping function returns `None`, the mapping is removed (or
 *   remains absent if initially absent).
 *
 * @tsplus static ImmutableMap/Aspects update
 */
export const update = Pipeable(update_);
