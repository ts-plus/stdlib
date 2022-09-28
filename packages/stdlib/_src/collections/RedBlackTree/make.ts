/**
 * Creates a new Red-Black Tree.
 *
 * @tsplus static RedBlackTree.Ops __call
 * @tsplus static RedBlackTree.Ops make
 */
export function make<K, Entries extends (readonly [K, any])[]>(
  ord: Ord<K>
): (
  ...entries: Entries
) => RedBlackTree<K, Entries[number] extends readonly [any, infer V] ? V : never> {
  return (...entries: Entries) =>
    RedBlackTree.from<K, Entries[number] extends readonly [any, infer V] ? V : never>(ord)(entries)
}
