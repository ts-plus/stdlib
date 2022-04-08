import type { HashMapInternal } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";
import { HashSetInternal, realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet";

/**
 * Adds a value to the `HashSet`.
 *
 * @tsplus operator HashSet +
 * @tsplus fluent HashSet add
 */
export function add_<A>(self: HashSet<A>, value: A): HashSet<A> {
  realHashSet(self);
  return (self._keyMap as HashMapInternal<A, unknown>)._editable
    ? (self._keyMap.set(value as A, true), self)
    : new HashSetInternal(self._keyMap.set(value as A, true));
}

/**
 * Adds a value to the `HashSet`.
 *
 * @tsplus static HashSet/Aspects add
 */
export const add = Pipeable(add_);
