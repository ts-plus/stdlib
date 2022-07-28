/**
 * @tsplus static Tree.Aspects zipWith
 * @tsplus pipeable Tree zipWith
 */
export function zipWith<A, B, C>(that: Tree<B>, f: (a: A, b: B) => C) {
  return (self: Tree<A>): Tree<C> => {
    const value = f(self.value, that.value)
    return Tree(value, self.forest.zipWith(that.forest, (a, b) => a.zipWith(b, f)))
  }
}
