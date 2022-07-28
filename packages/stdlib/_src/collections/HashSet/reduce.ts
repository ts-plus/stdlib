import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @tsplus static HashSet.Aspects reduce
 * @tsplus pipeable HashSet reduce
 */
export function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z) {
  return (self: HashSet<V>): Z => {
    realHashSet(self)
    return self._keyMap.reduceWithIndex(z, (z, v) => f(z, v))
  }
}
