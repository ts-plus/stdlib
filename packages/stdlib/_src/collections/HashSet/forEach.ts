import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @tsplus fluent HashSet forEach
 */
export function forEach_<A>(self: HashSet<A>, f: (v: A) => void) {
  realHashSet(self)
  self._keyMap.forEachWithIndex((k) => {
    f(k)
  })
}

/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @tsplus static HashSet/Aspects forEach
 */
export const forEach = Pipeable(forEach_)
