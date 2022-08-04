/**
 * Creates a new empty `ImmutableMap`.
 *
 * @tsplus static ImmutableMap.Ops empty
 */
export function empty<K = never, V = never>(): ImmutableMap<K, V> {
  return new ImmutableMap(new Map())
}
