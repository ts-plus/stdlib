/**
 * @tsplus static SortedMap.Ops __call
 * @tsplus static SortedMap.Ops make
 */
export function make<K, Entries extends Tuple<[K, any]>[]>(
  ord: Ord<K>
): (...entries: Entries) => SortedMap<
  K,
  Entries[number] extends Tuple<[any, infer V]> ? V : never
> {
  return (...entries: Entries) => SortedMap.from(ord)(entries)
}
