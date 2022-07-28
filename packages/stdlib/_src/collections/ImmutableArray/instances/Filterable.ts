import type * as P from "@tsplus/stdlib/prelude/Filterable"

/**
 * @tsplus static ImmutableArray.Ops Filterable
 */
export const Filterable = HKT.instance<P.Filterable<ImmutableArray.HKT>>({
  ...ImmutableArray.Filter,
  ...ImmutableArray.FilterMap,
  ...ImmutableArray.Partition,
  ...ImmutableArray.PartitionMap
})
