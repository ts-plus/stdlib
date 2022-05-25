import type * as P from "@tsplus/stdlib/prelude/FoldMap"

/**
 * @tsplus static Chunk/Ops FoldMap
 */
export const FoldMap = HKT.instance<P.FoldMap<Chunk.HKT>>({
  foldMap: (M) => (f) => (fa) => fa.foldMap(M, f)
})
