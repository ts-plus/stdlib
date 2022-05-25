import type * as P from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus static Chunk/Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Chunk.HKT>>({
  map: Chunk.$.map
})
