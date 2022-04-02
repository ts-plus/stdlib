/**
 * @tsplus fluent MutableHashMap has
 */
export function has_<K, V>(self: MutableHashMap<K, V>, key: K): boolean {
  return self.get(key).isSome();
}

export const has = Pipeable(has_);
