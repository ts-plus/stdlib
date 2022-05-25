/**
 * Alter the value stored for `key` in the `MutableHashMap` using the specified
 * function `f`, which uses the internal hash function.
 *
 * `f` will be invoked with the current value for `k` if it exists, or `None`
 *  if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 *
 * @tsplus fluent MutableHashMap modify
 */
export function modify_<K, V>(
  self: MutableHashMap<K, V>,
  key: K,
  f: (value: Option<V>) => Option<V>
) {
  const result = f(self.get(key))
  if (result.isSome()) {
    self.set(key, result.value)
  } else {
    self.remove(key)
  }
  return self
}

/**
 * Alter the value stored for `key` in the `MutableHashMap` using the specified
 * function `f`, which uses the internal hash function.
 *
 * `f` will be invoked with the current value for `k` if it exists, or `None`
 *  if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 */
export const modify = Pipeable(modify_)
