import type * as P from "@tsplus/stdlib/prelude/ReduceRightWithIndex"

/**
 * @tsplus static ImmutableArray.Ops ReduceRightWithIndex
 */
export const ReduceRightWithIndex = HKT.instance<
  P.ReduceRightWithIndex<number, ImmutableArray.HKT>
>({
  reduceRightWithIndex: (b, f) => (fa) => fa.array.reduceRight((b, a, i) => f(i, a, b), b)
})
