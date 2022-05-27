import type * as P from "@tsplus/stdlib/prelude/Separable"

/**
 * @tsplus static Chunk/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Separable<Chunk.HKT>>({
  separate: Chunk.separateF
})
