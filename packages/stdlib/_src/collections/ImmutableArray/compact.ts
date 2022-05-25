/**
 * Filters out `None` values from the `ImmutableArray`.
 *
 * @tsplus fluent ImmutableArray compact
 */
export function compact<A>(self: ImmutableArray<Option<A>>): ImmutableArray<A> {
  return self.collect(identity)
}
