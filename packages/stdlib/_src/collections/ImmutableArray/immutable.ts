/**
 * @tsplus fluent Array immutable
 */
export function immutable<A>(self: Array<A>): ImmutableArray<A> {
  return new ImmutableArray(self.slice(0, self.length))
}
