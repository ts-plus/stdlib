import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";

/**
 * Marks the `HashMap` as immutable.
 *
 * @tsplus fluent HashMap endMutation
 */
export function endMutation<K, V>(self: HashMap<K, V>): HashMap<K, V> {
  realHashMap(self);
  self._editable = false;
  return self;
}
