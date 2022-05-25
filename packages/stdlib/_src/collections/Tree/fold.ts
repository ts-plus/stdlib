/**
 * @tsplus fluent Tree fold
 */
export function fold_<A, B>(self: Tree<A>, f: (a: A, bs: Chunk<B>) => B): B {
  return f(self.value, self.forest.map((_) => _.fold(f)))
}

/**
 * @tsplus static Tree/Aspects fold
 */
export const fold = Pipeable(fold_)
