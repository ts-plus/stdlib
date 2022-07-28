import type { HashMapInternal } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import { HashSetInternal, realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Adds a value to the `HashSet`.
 *
 * @tsplus pipeable-operator HashSet +
 * @tsplus static HashSet.Aspects add
 * @tsplus pipeable HashSet add
 */
export function add<A>(value: A) {
  return (self: HashSet<A>): HashSet<A> => {
    realHashSet(self)
    return (self._keyMap as HashMapInternal<A, unknown>)._editable
      ? (self._keyMap.set(value as A, true), self)
      : new HashSetInternal(self._keyMap.set(value as A, true))
  }
}
