import { HashMapInternal, realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import type { Node } from "@tsplus/stdlib/collections/HashMap/_internal/node"

/**
 * Sets the root of the `HashMap`.
 *
 * @tsplus fluent HashMap setTree
 */
export function setTree_<K, V>(
  self: HashMap<K, V>,
  newRoot: Node<K, V>,
  newSize: number
): HashMap<K, V> {
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

/**
 * Sets the root of the `HashMap`.
 *
 * @tsplus static HashMap/Aspects setTree
 */
export const setTree = Pipeable(setTree_)
