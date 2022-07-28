/**
 * Iterate over the Tree in breadth-first order, applying `f`
 *
 * @tsplus static Tree.Aspects forEach
 * @tsplus pipeable Tree forEach
 */
export function forEach<A, U>(f: (a: A) => U) {
  return (self: Tree<A>): void => {
    f(self.value)
    self.forest.map((a: Tree<A>) => a.forEach(f))
  }
}
