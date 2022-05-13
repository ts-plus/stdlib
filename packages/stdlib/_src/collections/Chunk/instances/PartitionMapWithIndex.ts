import type * as P from "@tsplus/stdlib/prelude/PartitionMapWithIndex";

/**
 * @tsplus static Chunk/Ops PartitionMapWithIndex
 */
export const PartitionMapWithIndex = HKT.instance<P.PartitionMapWithIndex<number, Chunk.HKT>>({
  partitionMapWithIndex: Chunk.$.partitionMapWithIndex
});
