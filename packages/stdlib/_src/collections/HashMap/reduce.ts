/**
 * Reduces the specified state over the values of the `HashMap`.
 *
 * @tsplus fluent HashMap reduce
 */
export function reduce_<K, V, Z>(self: HashMap<K, V>, z: Z, f: (z: Z, v: V) => Z): Z {
  return self.reduceWithIndex(z, (z, _, v) => f(z, v))
}

/**
 * Reduces the specified state over the values of the `HashMap`.
 *
 * @tsplus static HashMap/Aspects reduce
 */
export const reduce = Pipeable(reduce_)
