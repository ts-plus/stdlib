import type * as P from "@tsplus/stdlib/prelude/Foldable"

/**
 * @tsplus static Chunk.Ops Foldable
 */
export const Foldable = HKT.instance<P.Foldable<Chunk.HKT>>({
  ...Chunk.FoldMap,
  ...Chunk.Reduce,
  ...Chunk.ReduceRight
})
