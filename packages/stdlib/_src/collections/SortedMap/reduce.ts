/**
 * @tsplus fluent SortedMap reduce
 */
export function reduce_<K, V, Z>(self: SortedMap<K, V>, z: Z, f: (acc: Z, v: V) => Z): Z {
  return self.reduceWithIndex(z, (acc, _, v) => f(acc, v))
}

/**
 * @tsplus static SortedMap/Aspects reduce
 */
export const reduce = Pipeable(reduce_)
