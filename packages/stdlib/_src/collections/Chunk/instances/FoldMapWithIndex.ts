import type * as P from "@tsplus/stdlib/prelude/FoldMapWithIndex"

/**
 * @tsplus static Chunk.Ops FoldMapWithIndex
 */
export const FoldMapWithIndex = HKT.instance<P.FoldMapWithIndex<number, Chunk.HKT>>({
  foldMapWithIndex: (M) => (f) => (fa) => fa.foldMapWithIndex(M, (a, i) => f(i, a))
})
