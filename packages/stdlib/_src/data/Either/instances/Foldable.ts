import type * as P from "@tsplus/stdlib/prelude/Foldable"

/**
 * @tsplus static Either.Ops Foldable
 */
export const Foldable = HKT.instance<P.Foldable<Either.HKT>>({
  ...Either.FoldMap,
  ...Either.Reduce,
  ...Either.ReduceRight
})
