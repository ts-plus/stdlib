/**
 * @tsplus static Tree.Aspects zip
 * @tsplus pipeable Tree zip
 */
export function zip<B>(that: Tree<B>) {
  return <A>(self: Tree<A>): Tree<Tuple<[A, B]>> => self.zipWith(that, Tuple.make)
}
