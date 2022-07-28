import type * as P from "@tsplus/stdlib/prelude/Reduce"

/**
 * @tsplus static Chunk.Ops Reduce
 */
export const Reduce = HKT.instance<P.Reduce<Chunk.HKT>>({
  reduce: Chunk.$.reduce
})
