import { HashMapInternal } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import { EmptyNode } from "@tsplus/stdlib/collections/HashMap/_internal/node"

/**
 * Creates a new `HashMap`.
 *
 * @tsplus static HashMap.Ops empty
 */
export function empty<K = never, V = never>(): HashMap<K, V> {
  return new HashMapInternal<K, V>(false, 0, new EmptyNode(), 0)
}
