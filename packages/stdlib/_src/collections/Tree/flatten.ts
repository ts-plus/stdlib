/**
 * Flatten a `Tree<Tree<A>>` into `a Tree<A>`
 *
 * @tsplus fluent Tree flatten
 */
export function flatten_<A>(self: Tree<Tree<A>>): Tree<A> {
  return self.flatMap(identity);
}

/**
 * @tsplus static Tree/Aspects flatten
 */
export const flatten = Pipeable(flatten_);
