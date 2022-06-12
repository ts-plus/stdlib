/**
 * @tsplus static ImmutableArray/Ops from
 * @tsplus getter Collection asImmutableArray
 */
export function from<A>(iterable: Collection<A>): ImmutableArray<A> {
  return new ImmutableArray(Array.from(iterable))
}
