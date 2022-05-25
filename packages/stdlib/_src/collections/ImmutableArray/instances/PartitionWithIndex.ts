import type * as P from "@tsplus/stdlib/prelude/PartitionWithIndex"

/**
 * @tsplus static ImmutableArray/Ops PartitionWithIndex
 */
export const PartitionWithIndex = HKT.instance<P.PartitionWithIndex<number, ImmutableArray.HKT>>({
  partitionWithIndex: ImmutableArray.$.partitionWithIndex
})
