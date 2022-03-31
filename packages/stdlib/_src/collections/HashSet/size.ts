import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Calculates the number of values in the `HashSet`.
 *
 * @tsplus getter HashSet size
 */
export function size<A>(self: HashSet<A>): number {
  realHashSet(self);
  return self._keyMap.size;
}
