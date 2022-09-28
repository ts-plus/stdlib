import { HashMapIterator, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

/**
 * Returns an `IterableIterator` of the values within the `HashMap`.
 *
 * @tsplus getter HashMap values
 */
export function values<K, V>(self: HashMap<K, V>): IterableIterator<V> {
  realHashMap(self)
  return new HashMapIterator(self, (_, value) => value)
}
