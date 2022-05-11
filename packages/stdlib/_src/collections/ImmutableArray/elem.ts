/**
 * Test if a value is a member of an array. Takes a `Equivalence<A>` as a single
 * argument which returns the function to use to search for a value of type `A`
 * in an `ImmutableArray<A>`.
 *
 * @tsplus fluent ImmutableArray elem
 */
export function elem_<A>(self: ImmutableArray<A>, E: Equivalence<A>) {
  return (a: A): boolean => {
    const predicate = (element: A) => E.equals(element, a);
    const len = self.array.length;
    for (let i = 0; i < len; i = i + 1) {
      if (predicate(self.array[i]!)) {
        return true;
      }
    }
    return false;
  };
}

/**
 * Test if a value is a member of an array. Takes a `Equivalence<A>` as a single
 * argument which returns the function to use to search for a value of type `A`
 * in an `ImmutableArray<A>`.
 *
 * @tsplus static ImmutableArray/Aspects elem
 */
export const elem = Pipeable(elem_);
