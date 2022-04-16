/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus fluent ImmutableMap filter
 */
export function filter_<K, V, B extends V>(
  self: ImmutableMap<K, V>,
  f: Refinement<V, B>
): ImmutableMap<V, B>;
export function filter_<K, V>(
  self: ImmutableMap<K, V>,
  f: Predicate<V>
): ImmutableMap<K, V>;
export function filter_<K, V>(
  self: ImmutableMap<K, V>,
  f: Predicate<V>
): ImmutableMap<K, V> {
  const map = new Map<K, V>();
  for (const [key, value] of self.internalMap) {
    if (f(value)) {
      map.set(key, value);
    }
  }
  return new ImmutableMap(map);
}

/**
 * Applies the specified predicate to each entry of the map, filitering out any
 * values that do not satisfy the predicate.
 *
 * @tsplus static ImmutableMap/Aspects filter
 */
export function filter<K, V, B extends V>(
  f: Refinement<V, B>
): (self: ImmutableMap<K, V>) => ImmutableMap<K, B>;
export function filter<K, V>(
  f: Predicate<V>
): (self: ImmutableMap<K, V>) => ImmutableMap<K, V>;
export function filter<K, V>(f: Predicate<V>) {
  return (self: ImmutableMap<K, V>): ImmutableMap<K, V> => self.filter(f);
}
