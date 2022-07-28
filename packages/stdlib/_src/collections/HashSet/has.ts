import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @tsplus static HashSet.Aspects has
 * @tsplus pipeable HashSet has
 */
export function has<A>(value: A) {
  return (self: HashSet<A>): boolean => {
    realHashSet(self)
    return self._keyMap.has(value)
  }
}
