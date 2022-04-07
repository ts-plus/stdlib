/**
 * @tsplus fluent SortedMap map
 */
export function map_<K, V, B>(self: SortedMap<K, V>, f: (v: V) => B): SortedMap<K, B> {
  return self.mapWithIndex((_, v: V) => f(v));
}

/**
 * @tsplus static SortedMap/Aspects map
 */
export const map = Pipeable(map_);
