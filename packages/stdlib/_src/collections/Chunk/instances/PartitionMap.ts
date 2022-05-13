import type * as P from "@tsplus/stdlib/prelude/PartitionMap";

/**
 * @tsplus static Chunk/Ops PartitionMap
 */
export const PartitionMap = HKT.instance<P.PartitionMap<Chunk.HKT>>({
  partitionMap: Chunk.$.partitionMap
});
