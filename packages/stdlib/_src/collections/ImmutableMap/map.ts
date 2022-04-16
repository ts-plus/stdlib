/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus fluent ImmutableMap map
 */
export function map_<K, V, B>(
  self: ImmutableMap<K, V>,
  f: (value: V) => B
): ImmutableMap<K, B> {
  const map = new Map<K, B>();
  for (const [key, value] of self.internalMap) {
    map.set(key, f(value));
  }
  return new ImmutableMap(map);
}

/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus static ImmutableMap/Aspects map
 */
export const map = Pipeable(map_);
