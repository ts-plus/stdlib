import type * as P from "@tsplus/stdlib/prelude/FoldMap"

/**
 * @tsplus static Tree.Ops FoldMap
 */
export const FoldMap = HKT.instance<P.FoldMap<Tree.HKT>>({
  foldMap: (M) => (f) => (fa) => fa.foldMap(M, f)
})
