/**
 * @tsplus static SortedMap.Ops __call
 * @tsplus static SortedMap.Ops make
 */
export function make<K>(
  ord: Ord<K>
): <Entries extends (readonly [K, any])[]>(...entries: Entries) => SortedMap<
  K,
  Entries[number] extends (readonly [any, infer V]) ? V : never
> {
  return (...entries) => SortedMap.from(ord)(entries)
}
