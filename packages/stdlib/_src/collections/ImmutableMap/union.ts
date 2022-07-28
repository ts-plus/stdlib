/**
 * Performs a union of this `ImmutableMap` and that `ImmutableMap`.
 *
 * @tsplus pipeable-operator ImmutableMap +
 * @tsplus static ImmutableMap.Aspects union
 * @tsplus pipeable ImmutableMap union
 */
export function union<K1, V1>(that: ImmutableMap<K1, V1>) {
  return <K0, V0>(self: ImmutableMap<K0, V0>): ImmutableMap<K0 | K1, V0 | V1> => {
    const result = new Map<K0 | K1, V0 | V1>(self.internalMap)
    that.internalMap.forEach((v, k) => {
      result.set(k, v)
    })
    return new ImmutableMap(result)
  }
}
