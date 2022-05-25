/**
 * Reduces the specified state over the entries of the `ImmutableMap`.
 *
 * @tsplus fluent ImmutableMap reduceWithIndex
 */
export function reduceWithIndex_<K, V, Z>(
  self: ImmutableMap<K, V>,
  z: Z,
  f: (z: Z, k: K, v: V) => Z
): Z {
  let s = z
  self.internalMap.forEach((v, k) => {
    s = f(s, k, v)
  })
  return s
}

/**
 * Reduces the specified state over the entries of the `ImmutableMap`.
 *
 * @tsplus static ImmutableMap/Aspects reduceWithIndex
 */
export const reduceWithIndex = Pipeable(reduceWithIndex_)
