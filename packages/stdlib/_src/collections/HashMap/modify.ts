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
 * @tsplus static HashMap.Aspects modify
 * @tsplus pipeable HashMap modify
 */
export function modify<K, V>(key: K, f: UpdateFn<V>) {
  return (self: HashMap<K, V>): HashMap<K, V> => self.modifyHash(key, Hash.unknown(key), f)
}
