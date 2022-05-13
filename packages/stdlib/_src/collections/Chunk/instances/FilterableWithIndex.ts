import type * as P from "@tsplus/stdlib/prelude/FilterableWithIndex";

/**
 * @tsplus static Chunk/Ops FilterableWithIndex
 */
export const FilterableWithIndex = HKT.instance<P.FilterableWithIndex<number, Chunk.HKT>>({
  ...Chunk.FilterWithIndex,
  ...Chunk.FilterMapWithIndex,
  ...Chunk.PartitionWithIndex,
  ...Chunk.PartitionMapWithIndex
});
