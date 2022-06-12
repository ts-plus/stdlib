/**
 * Retrieves all elements of the array except the last element.
 *
 * @tsplus getter NonEmptyImmutableArray init
 */
export function init<A>(self: NonEmptyImmutableArray<A>): ImmutableArray<A> {
  return new ImmutableArray(self.array.slice(0, -1))
}
