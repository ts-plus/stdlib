import type * as P from "@tsplus/stdlib/prelude/FilterWithIndex";

/**
 * @tsplus static Chunk/Ops FilterWithIndex
 */
export const FilterWithIndex = HKT.instance<P.FilterWithIndex<number, Chunk.HKT>>({
  filterWithIndex: Chunk.$.filterWithIndex
});
