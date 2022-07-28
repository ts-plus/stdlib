import type * as P from "@tsplus/stdlib/prelude/FilterMapWithIndex"

/**
 * @tsplus static Chunk.Ops FilterMapWithIndex
 */
export const FilterMapWithIndex = HKT.instance<P.FilterMapWithIndex<number, Chunk.HKT>>({
  filterMapWithIndex: Chunk.$.collectWithIndex
})
