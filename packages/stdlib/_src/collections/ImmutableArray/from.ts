/**
 * @tsplus static ImmutableArrayOps from
 * @tsplus fluent Collection asImmutableArray
 */
export function from<A>(iterable: Collection<A>): ImmutableArray<A> {
  return new ImmutableArray(Array.from(iterable));
}
