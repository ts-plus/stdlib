import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

/**
 * Returns the number of entries within the `HashMap`.
 *
 * @tsplus getter HashMap size
 */
export function size<K, V>(self: HashMap<K, V>): number {
  realHashMap(self)
  return self._size
}
