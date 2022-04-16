/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus fluent ImmutableMap filterMap
 */
export function filterMap_<K, V, B>(
  self: ImmutableMap<K, V>,
  pf: (value: V) => Option<B>
): ImmutableMap<K, B> {
  return self.filterMapWithIndex((_, value) => pf(value));
}

/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus static ImmutableMap/Aspects filterMap
 */
export const filterMap = Pipeable(filterMap_);
