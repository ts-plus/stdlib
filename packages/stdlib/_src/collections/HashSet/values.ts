import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Returns an `IterableIterator` of the values in the `HashSet`.
 *
 * @tsplus getter HashSet values
 */
export function values<A>(self: HashSet<A>): IterableIterator<A> {
  realHashSet(self)
  return self._keyMap.keys
}
