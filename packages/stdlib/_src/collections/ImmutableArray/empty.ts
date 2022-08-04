/**
 * @tsplus static ImmutableArray.Ops empty
 */
export function empty<A = never>(): ImmutableArray<A> {
  return new ImmutableArray([])
}
