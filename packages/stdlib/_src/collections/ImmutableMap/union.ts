/**
 * Performs a union of this `ImmutableMap` and that `ImmutableMap`.
 *
 * @tsplus operator ImmutableMap +
 * @tsplus fluent ImmutableMap union
 */
export function union_<K0, V0, K1, V1>(self: ImmutableMap<K0, V0>, that: ImmutableMap<K1, V1>) {
  const result = new Map<K0 | K1, V0 | V1>(self.internalMap);

  that.internalMap.forEach((v, k) => {
    result.set(k, v);
  });

  return new ImmutableMap(result);
}

/**
 * Performs a union of this `ImmutableMap` and that `ImmutableMap`.
 *
 * @tsplus static ImmutableMap/Aspects union
 */
export const union = Pipeable(union_);
