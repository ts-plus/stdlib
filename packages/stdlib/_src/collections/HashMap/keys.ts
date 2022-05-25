import { HashMapIterator, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"

/**
 * Returns an `IterableIterator` of the keys within the `HashMap`.
 *
 * @tsplus fluent HashMap keys
 */
export function keys<K, V>(self: HashMap<K, V>): IterableIterator<K> {
  realHashMap(self)
  return new HashMapIterator(self, ({ tuple: [key] }) => key)
}
