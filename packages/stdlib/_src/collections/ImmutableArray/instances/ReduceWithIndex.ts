import type * as P from "@tsplus/stdlib/prelude/ReduceWithIndex"

/**
 * @tsplus static ImmutableArray.Ops ReduceWithIndex
 */
export const ReduceWithIndex = HKT.instance<P.ReduceWithIndex<number, ImmutableArray.HKT>>({
  reduceWithIndex: (b, f) => (fa) => fa.reduceWithIndex(b, (b, a, i) => f(i, b, a))
})
