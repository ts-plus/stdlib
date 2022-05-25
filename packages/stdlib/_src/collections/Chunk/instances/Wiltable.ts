import type * as P from "@tsplus/stdlib/prelude/Wiltable"

/**
 * @tsplus static Chunk/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Wiltable<Chunk.HKT>>({
  separateF: Chunk.separateF
})
