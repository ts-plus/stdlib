/**
 * @tsplus static Tree.Aspects zip
 * @tsplus pipeable Tree zip
 */
export function zip<B>(that: Tree<B>) {
  return <A>(self: Tree<A>): Tree<readonly [A, B]> => self.zipWith(that, (a, b) => [a, b])
}
