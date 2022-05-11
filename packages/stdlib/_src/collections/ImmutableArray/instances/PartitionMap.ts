import type * as P from "@tsplus/stdlib/prelude/PartitionMap";

/**
 * @tsplus static ImmutableArray/Ops PartitionMap
 */
export const PartitionMap = HKT.instance<P.PartitionMap<ImmutableArray.HKT>>({
  partitionMap: ImmutableArray.$.partitionMap
});
