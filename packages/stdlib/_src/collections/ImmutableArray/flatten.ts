/**
 * Flattens nested `ImmutableArray`s.
 *
 * @tsplus getter ImmutableArray flatten
 */
export function flatten<A>(self: ImmutableArray<ImmutableArray<A>>): ImmutableArray<A> {
  return self.flatMap(identity)
}
