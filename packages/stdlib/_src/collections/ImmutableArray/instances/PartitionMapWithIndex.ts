import type * as P from "@tsplus/stdlib/prelude/PartitionMapWithIndex"

/**
 * @tsplus static ImmutableArray.Ops PartitionMapWithIndex
 */
export const PartitionMapWithIndex = HKT.instance<
  P.PartitionMapWithIndex<number, ImmutableArray.HKT>
>({
  partitionMapWithIndex: ImmutableArray.$.partitionMapWithIndex
})
