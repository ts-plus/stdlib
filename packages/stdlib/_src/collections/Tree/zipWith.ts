/**
 * @tsplus fluent Tree zipWith
 */
export function zipWith_<A, B, C>(
  self: Tree<A>,
  that: Tree<B>,
  f: (a: A, b: B) => C
): Tree<C> {
  const value = f(self.value, that.value);
  return Tree(value, self.forest.zipWith(that.forest, (a, b) => a.zipWith(b, f)));
}

/**
 * @tsplus static Tree/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_);
