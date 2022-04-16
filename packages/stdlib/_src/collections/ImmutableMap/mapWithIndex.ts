/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus fluent ImmutableMap mapWithIndex
 */
export function mapWithIndex_<K, V, B>(
  self: ImmutableMap<K, V>,
  f: (key: K, value: V) => B
): ImmutableMap<K, B> {
  const map = new Map<K, B>();
  for (const [key, value] of self.internalMap) {
    map.set(key, f(key, value));
  }
  return new ImmutableMap(map);
}

/**
 * Transforms the values of the map using the specified function.
 *
 * @tsplus static ImmutableMap/Aspects mapWithIndex
 */
export const mapWithIndex = Pipeable(mapWithIndex_);
