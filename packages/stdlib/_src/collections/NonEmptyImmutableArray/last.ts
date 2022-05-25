/**
 * Retrieves the last element of the array.
 *
 * @tsplus getter NonEmptyImmutableArray last
 */
export function last<A>(self: NonEmptyImmutableArray<A>): A {
  return self.array[self.array.length - 1]!
}
