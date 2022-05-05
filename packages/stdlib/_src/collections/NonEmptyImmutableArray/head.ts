/**
 * Retrieves the first element of the array.
 *
 * @tsplus getter NonEmptyImmutableArray head
 */
export function head<A>(self: NonEmptyImmutableArray<A>): A {
  return self.array[0];
}
