import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Applies the specified function to the values of the `HashSet`.
 *
 * @tsplus static HashSet.Aspects forEach
 * @tsplus pipeable HashSet forEach
 */
export function forEach<A>(f: (v: A) => void) {
  return (self: HashSet<A>): void => {
    realHashSet(self)
    self._keyMap.forEachWithIndex((k) => {
      f(k)
    })
  }
}
