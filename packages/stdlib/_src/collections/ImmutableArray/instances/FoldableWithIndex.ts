import type * as P from "@tsplus/stdlib/prelude/FoldableWithIndex"

/**
 * @tsplus static ImmutableArray/Ops FoldableWithIndex
 */
export const FoldableWithIndex = HKT.instance<P.FoldableWithIndex<number, ImmutableArray.HKT>>({
  ...ImmutableArray.FoldMapWithIndex,
  ...ImmutableArray.ReduceWithIndex,
  ...ImmutableArray.ReduceRightWithIndex
})
