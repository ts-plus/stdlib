import type * as P from "@tsplus/stdlib/prelude/Foldable"

/**
 * @tsplus static ImmutableArray.Ops Foldable
 */
export const Foldable = HKT.instance<P.Foldable<ImmutableArray.HKT>>({
  ...ImmutableArray.FoldMap,
  ...ImmutableArray.Reduce,
  ...ImmutableArray.ReduceRight
})
