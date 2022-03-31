import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap";
import { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node";

/**
 * Checks if the `HashMap` contains any entries.
 *
 * @tsplus fluent HashMap isEmpty
 */
export function isEmpty<K, V>(self: HashMap<K, V>): boolean {
  realHashMap(self);
  return self && Node.isEmptyNode(self._root);
}
