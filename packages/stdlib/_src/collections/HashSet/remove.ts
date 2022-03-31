import type { HashMapInternal } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";
import { HashSetInternal, realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Removes a value from the `HashSet`.
 *
 * @tsplus operator HashSet -
 * @tsplus fluent HashSet remove
 */
export function remove_<A>(self: HashSet<A>, value: A): HashSet<A> {
  realHashSet(self);
  return (self._keyMap as HashMapInternal<A, unknown>)._editable
    ? (self._keyMap.remove(value), self)
    : new HashSetInternal(self._keyMap.remove(value));
}

/**
 * Removes a value from the `HashSet`.
 *
 * @tsplus static HashSet/Aspects remove
 */
export const remove = Pipeable(remove_);
