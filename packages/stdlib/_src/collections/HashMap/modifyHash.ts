import { realHashMap } from "@tsplus/stdlib/collections/HashMap/_internal/hashMap"
import type { UpdateFn } from "@tsplus/stdlib/collections/HashMap/_internal/node"

/**
 * Alter the value of the specified key in the `HashMap` using the specified
 * update function. The value of the specified key will be computed using the
 * provided hash.
 *
 * The update function will be invoked with the current value of the key if it
 * exists, or `None` if no such value exists.
 *
 * This function will always either update or insert a value into the `HashMap`.
 *
 * @tsplus static HashMap.Aspects modifyHash
 * @tsplus pipeable HashMap modifyHash
 */
export function modifyHash<K, V>(key: K, hash: number, f: UpdateFn<V>) {
  return (self: HashMap<K, V>): HashMap<K, V> => {
    realHashMap(self)
    const size = { value: self._size }
    const newRoot = self._root.modify(
      self._editable ? self._edit : NaN,
      0,
      f,
      hash,
      key,
      size
    )
    return (self as HashMap<K, V>).setTree(newRoot, size.value)
  }
}
