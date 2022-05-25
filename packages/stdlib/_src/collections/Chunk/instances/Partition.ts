import type * as P from "@tsplus/stdlib/prelude/Partition"

/**
 * @tsplus static Chunk/Ops Partition
 */
export const Partition = HKT.instance<P.Partition<Chunk.HKT>>({
  partition: Chunk.$.partition
})
