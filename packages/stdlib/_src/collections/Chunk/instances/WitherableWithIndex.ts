import type * as P from "@tsplus/stdlib/prelude/WitherableWithIndex"

/**
 * @tsplus static Chunk.Ops WitherableWithIndex
 */
export const WitherableWithIndex = HKT.instance<P.WitherableWithIndex<number, Chunk.HKT>>({
  compactWithIndexF: Chunk.compactWithIndexF
})
