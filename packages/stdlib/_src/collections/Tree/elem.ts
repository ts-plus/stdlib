/**
 * Test if a value is a member of a `Tree`. Takes a `Equivalence<A>` and a
 * value of `A` and returns a `boolean` if the `value` is contained in `Tree`
 *
 * @tsplus fluent Tree elem
 */
export function elem_<A>(self: Tree<A>, E: Equivalence<A>, value: A): boolean {
  return E.equals(self.value, value) ||
    self.forest.exists((tree) => tree.elem(E, value))
}

/**
 * Test if a value is a member of a `Tree`. Takes a `Equivalence<A>` as a single
 * argument which returns the function to use to search for a value of type `A`
 * in type `Tree<A>`.
 *
 * @tsplus static Tree/Aspects elem
 */
export const elem = Pipeable(elem_)
