/**
 * Convert a `Tree<A>` into a `Tree<B>` using a function from `Tree<A> => B`
 * applied to each node in the Tree.
 *
 * @tsplus fluent Tree extend
 */
export function extend_<A, B>(self: Tree<A>, f: (wa: Tree<A>) => B): Tree<B> {
  return Tree(
    f(self),
    self.forest.map((_) => _.extend(f))
  );
}

/**
 * Convert a Tree<A> into a Tree<B> using a function from `Tree<A> => B`
 * @tsplus static Tree/Aspects extend
 */
export const extend = Pipeable(extend_);
