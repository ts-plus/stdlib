/**
 * Alter the value stored for `key` in the `MutableHashMap` using the specified
 * function `f`, which uses the internal hash function.
 *
 * `f` will be invoked with the current value for `k` if it exists, or `None`
 *  if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 *
 * @tsplus static MutableHashMap.Aspects modify
 * @tsplus pipeable MutableHashMap modify
 */
export function modify<K, V>(key: K, f: (value: Maybe<V>) => Maybe<V>) {
  return (self: MutableHashMap<K, V>): MutableHashMap<K, V> => {
    const result = f(self.get(key))
    if (result.isSome()) {
      self.set(key, result.value)
    } else {
      self.remove(key)
    }
    return self
  }
}
