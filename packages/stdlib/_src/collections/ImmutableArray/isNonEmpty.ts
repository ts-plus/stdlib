/**
 * @tsplus fluent ImmutableArray isNonEmpty
 */
export function isNonEmpty<A>(self: ImmutableArray<A>): self is NonEmptyImmutableArray<A> {
  return self.array.length > 0;
}
