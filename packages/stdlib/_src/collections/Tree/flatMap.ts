/**
 * Take a `Tree<A>` and a function from `f: (a:A) => Tree<B>` and
 * return a Tree<B>
 *
 * @tsplus fluent Tree flatMap
 */
export function flatMap_<A, B>(self: Tree<A>, f: (a: A) => Tree<B>): Tree<B> {
  const { forest, value } = f(self.value);
  return Tree(value, forest + self.forest.map((a) => a.flatMap(f)));
}

/**
 * Return a Tree<B> from a `Tree<A>` and a function from `f: (a:A) => Tree<B>`
 *
 * @tsplus static Tree/Ops flatMap
 */
export const flatMap = Pipeable(flatMap_);
