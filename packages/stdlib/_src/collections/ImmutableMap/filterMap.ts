/**
 * Applies the specified partial function to each entry of the map, filtering
 * out `None` values.
 *
 * @tsplus static ImmutableMap.Aspects filterMap
 * @tsplus pipeable ImmutableMap filterMap
 */
export function filterMap<V, B>(pf: (value: V) => Maybe<B>) {
  return <K>(self: ImmutableMap<K, V>): ImmutableMap<K, B> =>
    self.filterMapWithIndex((_, value) => pf(value))
}
