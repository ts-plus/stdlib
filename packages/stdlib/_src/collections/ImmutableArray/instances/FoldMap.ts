import type * as P from "@tsplus/stdlib/prelude/FoldMap"

/**
 * @tsplus static ImmutableArray/Ops FoldMap
 */
export const FoldMap = HKT.instance<P.FoldMap<ImmutableArray.HKT>>({
  foldMap: (M) => (f) => (fa) => fa.foldMap(M, f)
})
