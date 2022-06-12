/**
 * Retrieves all elements of the array except for the first.
 *
 * @tsplus getter NonEmptyImmutableArray tail
 */
export function tail<A>(self: NonEmptyImmutableArray<A>): ImmutableArray<A> {
  return new ImmutableArray(self.array.slice(1))
}
