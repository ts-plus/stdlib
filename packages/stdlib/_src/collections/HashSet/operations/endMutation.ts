import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import { realHashSet } from "@tsplus/stdlib/collections/HashSet/_internal/hashSet"

/**
 * Marks the `HashSet` as immutable.
 *
 * @tsplus getter HashSet endMutation
 */
export function endMutation<A>(self: HashSet<A>): HashSet<A> {
  realHashSet(self)
  realHashMap(self._keyMap)
  self._keyMap._editable = false
  return self
}
