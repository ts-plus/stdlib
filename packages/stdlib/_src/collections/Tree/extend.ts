/**
 * Convert a `Tree<A>` into a `Tree<B>` using a function from `Tree<A> => B`
 * applied to each node in the Tree.
 *
 * @tsplus static Tree.Aspects extend
 * @tsplus pipeable Tree extend
 */
export function extend<A, B>(f: (wa: Tree<A>) => B) {
  return (self: Tree<A>): Tree<B> => Tree(f(self), self.forest.map((_) => _.extend(f)))
}
