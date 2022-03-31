import { HashSetInternal, realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Marks the `HashSet` as mutable.
 *
 * @tsplus fluent HashSet beginMutation
 */
export function beginMutation<A>(self: HashSet<A>): HashSet<A> {
  realHashSet(self);
  return new HashSetInternal(self._keyMap.beginMutation());
}
