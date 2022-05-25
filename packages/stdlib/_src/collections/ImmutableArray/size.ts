/**
 * @tsplus getter ImmutableArray size
 */
export function size<A>(self: ImmutableArray<A>) {
  return self.array.length
}
