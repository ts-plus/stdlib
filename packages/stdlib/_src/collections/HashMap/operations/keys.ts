import { HashMapIterator, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

/**
 * Returns an `IterableIterator` of the keys within the `HashMap`.
 *
 * @tsplus getter HashMap keys
 */
export function keys<K, V>(self: HashMap<K, V>): IterableIterator<K> {
  realHashMap(self)
  return new HashMapIterator(self, (key) => key)
}
