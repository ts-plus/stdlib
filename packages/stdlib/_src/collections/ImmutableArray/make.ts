/**
 * @tsplus static ImmutableArrayOps __call
 * @tsplus static ImmutableArrayOps make
 */
export function make<A extends readonly any[]>(...as: A): ImmutableArray<A[number]> {
  return new ImmutableArray(as);
}
