/**
 * @tsplus static Tree.Aspects fold
 * @tsplus pipeable Tree fold
 */
export function fold_<A, B>(f: (a: A, bs: Chunk<B>) => B) {
  return (self: Tree<A>): B => f(self.value, self.forest.map((_) => _.fold(f)))
}
