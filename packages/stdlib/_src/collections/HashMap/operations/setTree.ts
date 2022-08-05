import { HashMapInternal, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import type { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node"

/**
 * Sets the root of the `HashMap`.
 *
 * @tsplus static HashMap.Aspects setTree
 * @tsplus pipeable HashMap setTree
 */
export function setTree<K, V>(newRoot: Node<K, V>, newSize: number) {
  return (self: HashMap<K, V>): HashMap<K, V> => {
    realHashMap(self)
    if (self._editable) {
      self._root = newRoot
      self._size = newSize
      return self
    }
    return newRoot === self._root
      ? self
      : new HashMapInternal(self._editable, self._edit, newRoot, newSize)
  }
}
