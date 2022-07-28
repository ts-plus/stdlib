/**
 * Flatten a `Tree<Tree<A>>` into `a Tree<A>`
 *
 * @tsplus getter Tree flatten
 */
export function flatten<A>(self: Tree<Tree<A>>): Tree<A> {
  return self.flatMap(identity)
}
