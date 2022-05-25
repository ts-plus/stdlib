/**
 * Test if a value is a member of an array. Takes a `Equivalence<A>` as a single
 * argument which returns the function to use to search for a value of type `A`
 * in an array of type `Chunk<A>`.
 *
 * @tsplus fluent Chunk elem
 */
export function elem_<A>(self: Chunk<A>, E: Equivalence<A>, value: A): boolean {
  const predicate = (element: A) => E.equals(element, value)
  for (let i = 0; i < self.length; i++) {
    if (predicate(self.unsafeGet(i)!)) {
      return true
    }
  }
  return false
}

/**
 * Test if a value is a member of an array. Takes a `Equivalence<A>` as a single
 * argument which returns the function to use to search for a value of type `A`
 * in an array of type `Chunk<A>`.
 *
 * @tsplus static Chunk/Aspects elem
 */
export const elem = Pipeable(elem_)
