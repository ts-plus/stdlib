import type * as P from "@tsplus/stdlib/prelude/PartitionWithIndex"

/**
 * @tsplus static Chunk/Ops PartitionWithIndex
 */
export const PartitionWithIndex = HKT.instance<P.PartitionWithIndex<number, Chunk.HKT>>({
  partitionWithIndex: Chunk.$.partitionWithIndex
})
