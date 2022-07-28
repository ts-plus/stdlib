import type * as P from "@tsplus/stdlib/prelude/FilterMap"

/**
 * @tsplus static Chunk.Ops FilterMap
 */
export const FilterMap = HKT.instance<P.FilterMap<Chunk.HKT>>({
  filterMap: Chunk.$.collect
})
