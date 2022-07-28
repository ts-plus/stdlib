/**
 * @tsplus static Map.Ops from
 */
export function from<K, V>(
  data: Collection<Tuple<[K, V]>>
): Map<K, V> {
  return new Map(data.map((_) => _.toNative))
}
