/**
 * @tsplus static Tree.Aspects map
 * @tsplus pipeable Tree map
 */
export function map<A, B>(f: (a: A) => B) {
  return (self: Tree<A>): Tree<B> => Tree(f(self.value), self.forest.map((fa) => fa.map(f)))
}
