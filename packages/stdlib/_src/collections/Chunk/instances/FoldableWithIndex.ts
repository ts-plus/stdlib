import type * as P from "@tsplus/stdlib/prelude/FoldableWithIndex"

/**
 * @tsplus static Chunk/Ops FoldableWithIndex
 */
export const FoldableWithIndex = HKT.instance<P.FoldableWithIndex<number, Chunk.HKT>>({
  ...Chunk.FoldMapWithIndex,
  ...Chunk.ReduceWithIndex,
  ...Chunk.ReduceRightWithIndex
})
