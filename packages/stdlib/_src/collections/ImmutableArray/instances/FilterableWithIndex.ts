import type * as P from "@tsplus/stdlib/prelude/FilterableWithIndex";

/**
 * @tsplus static ImmutableArray/Ops FilterableWithIndex
 */
export const FilterableWithIndex = HKT.instance<P.FilterableWithIndex<number, ImmutableArray.HKT>>({
  ...ImmutableArray.FilterWithIndex,
  ...ImmutableArray.FilterMapWithIndex,
  ...ImmutableArray.PartitionWithIndex,
  ...ImmutableArray.PartitionMapWithIndex
});
