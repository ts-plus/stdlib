import type * as P from "@tsplus/stdlib/prelude/Extend"

/**
 * @tsplus static Chunk/Ops Extend
 */
export const Extend = HKT.instance<P.Extend<Chunk.HKT>>({
  extend: Chunk.$.extend
})
