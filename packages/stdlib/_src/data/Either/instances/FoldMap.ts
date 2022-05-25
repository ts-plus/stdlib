import type * as P from "@tsplus/stdlib/prelude/FoldMap"

/**
 * @tsplus static Either/Ops FoldMap
 */
export const FoldMap = HKT.instance<P.FoldMap<Either.HKT>>({
  foldMap: Either.$.foldMap
})
