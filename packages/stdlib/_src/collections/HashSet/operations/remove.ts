import type { HashMapInternal } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import { HashSetInternal, realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Removes a value from the `HashSet`.
 *
 * @tsplus pipeable-operator HashSet -
 * @tsplus static HashSet.Aspects remove
 * @tsplus pipeable HashSet remove
 */
export function remove<A>(value: A) {
  return (self: HashSet<A>): HashSet<A> => {
    realHashSet(self)
    return (self._keyMap as HashMapInternal<A, unknown>)._editable
      ? (self._keyMap.remove(value), self)
      : new HashSetInternal(self._keyMap.remove(value))
  }
}
