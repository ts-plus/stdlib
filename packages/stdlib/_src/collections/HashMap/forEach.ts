/**
 * Applies the specified function to the values of the `HashMap`.
 *
 * @tsplus fluent HashMap forEach
 */
export function forEach_<K, V>(self: HashMap<K, V>, f: (v: V) => void): void {
  self.forEachWithIndex((_, value) => f(value));
}

/**
 * Applies the specified function to the values of the `HashMap`.
 *
 * @tsplus static HashMap/Aspects forEach
 */
export const forEach = Pipeable(forEach_);
