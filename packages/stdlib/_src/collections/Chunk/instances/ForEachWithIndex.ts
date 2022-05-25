import type * as P from "@tsplus/stdlib/prelude/ForEachWithIndex"

/**
 * @tsplus static Chunk/Ops ForEachWithIndex
 */
export const ForEachWithIndex = HKT.instance<P.ForEachWithIndex<number, Chunk.HKT>>({
  ...Chunk.Covariant,
  forEachWithIndexF: Chunk.forEachWithIndexF
})
