import type * as P from "@tsplus/stdlib/prelude/Filter"

/**
 * @tsplus static Chunk.Ops Filter
 */
export const Filter = HKT.instance<P.Filter<Chunk.HKT>>({
  filter: Chunk.$.filter
})
