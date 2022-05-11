import type * as P from "@tsplus/stdlib/prelude/Partition";

/**
 * @tsplus static ImmutableArray/Ops Partition
 */
export const Partition = HKT.instance<P.Partition<ImmutableArray.HKT>>({
  partition: ImmutableArray.$.partition
});
