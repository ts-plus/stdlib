/**
 * @tsplus static ImmutableArray.Ops __call
 * @tsplus static ImmutableArray.Ops make
 */
export function make<A extends readonly any[]>(...as: A): ImmutableArray<A[number]> {
  return new ImmutableArray(as)
}
