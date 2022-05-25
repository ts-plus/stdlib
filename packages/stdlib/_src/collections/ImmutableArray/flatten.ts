/**
 * Flattens nested `ImmutableArray`s.
 *
 * @tsplus fluent ImmutableArray flatten
 */
export function flatten<A>(self: ImmutableArray<ImmutableArray<A>>): ImmutableArray<A> {
  return self.flatMap(identity)
}
