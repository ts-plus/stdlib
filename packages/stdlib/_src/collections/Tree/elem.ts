/**
 * Test if a value is a member of a `Tree`. Takes a `Equivalence<A>` and a
 * value of `A` and returns a `boolean` if the `value` is contained in `Tree`
 *
 * @tsplus static Tree.Aspects elem
 * @tsplus pipeable Tree elem
 */
export function elem<A>(E: Equivalence<A>, value: A) {
  return (self: Tree<A>): boolean =>
    E.equals(self.value, value) ||
    self.forest.exists((tree) => tree.elem(E, value))
}
