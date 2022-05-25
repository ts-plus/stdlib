import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @tsplus fluent HashSet has
 */
export function has_<A>(self: HashSet<A>, value: A): boolean {
  realHashSet(self)
  return self._keyMap.has(value)
}

/**
 * Checks if the specified value exists in the `HashSet`.
 *
 * @tsplus static HashSet/Aspects has
 */
export const has = Pipeable(has_)
