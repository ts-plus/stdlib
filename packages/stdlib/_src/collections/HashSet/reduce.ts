import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @tsplus fluent HashSet reduce
 */
export function reduce_<V, Z>(self: HashSet<V>, z: Z, f: (z: Z, v: V) => Z): Z {
  realHashSet(self);
  return self._keyMap.reduceWithIndex(z, (z, v) => f(z, v));
}

/**
 * Reduces the specified state over the values of the `HashSet`.
 *
 * @tsplus static HashSet/Aspects reduce
 */
export const reduce = Pipeable(reduce_);
