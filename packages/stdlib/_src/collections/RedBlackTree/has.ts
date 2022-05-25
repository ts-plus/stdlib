/**
 * Finds the item with key if it exists.
 *
 * @tsplus fluent RedBlackTree has
 */
export function has_<K, V>(self: RedBlackTree<K, V>, key: K): boolean {
  return self.findFirst(key).isSome()
}

/**
 * Finds the item with key if it exists.
 *
 * @tsplus static RedBlackTree/Aspects has
 */
export const has = Pipeable(has_)
