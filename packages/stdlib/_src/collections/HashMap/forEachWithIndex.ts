/**
 * Applies the specified function to the entries of the `HashMap`.a
 *
 * @tsplus fluent HashMap forEachWithIndex
 */
export function forEachWithIndex_<K, V>(
  self: HashMap<K, V>,
  f: (k: K, v: V) => void
): void {
  self.reduceWithIndex(undefined as void, (_, key, value) => f(key, value))
}

/**
 * Applies the specified function to the entries of the `HashMap`.
 *
 * @tsplus static HashMap/Aspects forEachWithIndex
 */
export const forEachWithIndex = Pipeable(forEachWithIndex_)
