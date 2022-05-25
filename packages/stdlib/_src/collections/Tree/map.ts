/**
 * @tsplus fluent Tree map
 */
export function map_<A, B>(self: Tree<A>, f: (a: A) => B): Tree<B> {
  return Tree(
    f(self.value),
    self.forest.map((fa) => fa.map(f))
  )
}

/**
 * @tsplus static Tree/Aspects map
 */
export const map = Pipeable(map_)
