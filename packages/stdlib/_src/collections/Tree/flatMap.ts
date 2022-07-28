/**
 * Take a `Tree<A>` and a function from `f: (a:A) => Tree<B>` and
 * return a Tree<B>
 *
 * @tsplus static Tree.Aspects flatMap
 * @tsplus pipeable Tree flatMap
 */
export function flatMap<A, B>(f: (a: A) => Tree<B>) {
  return (self: Tree<A>): Tree<B> => {
    const { forest, value } = f(self.value)
    return Tree(value, forest + self.forest.map((a) => a.flatMap(f)))
  }
}
