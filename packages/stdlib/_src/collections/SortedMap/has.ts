/**
 * @tsplus fluent SortedMap has
 */
export function has_<K, V>(self: SortedMap<K, V>, key: K): boolean {
  return self.get(key).isSome()
}

/**
 * @tsplus static SortedMap/Aspects has
 */
export const has = Pipeable(has_)
