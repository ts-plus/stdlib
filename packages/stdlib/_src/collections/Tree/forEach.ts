/**
 * Iterate over the Tree in breadth-first order, applying `f`
 *
 * @tsplus fluent Tree forEach
 */
export function forEach_<A, U>(self: Tree<A>, f: (a: A) => U): void {
  f(self.value);
  self.forest.map((a: Tree<A>) => a.forEach(f));
  return;
}

/**
 * Iterate over the Tree in breadth-first order, applying `f`
 *
 * @tsplus static Tree/Aspects forEach
 */
export const forEach = Pipeable(forEach_);
