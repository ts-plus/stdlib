import { HashMapInternal, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

/**
 * Marks the `HashMap` as mutable.
 *
 * @tsplus fluent HashMap beginMutation
 */
export function beginMutation<K, V>(self: HashMap<K, V>): HashMap<K, V> {
  realHashMap(self)
  return new HashMapInternal(true, self._edit + 1, self._root, self._size)
}
