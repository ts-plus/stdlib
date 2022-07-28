import type * as P from "@tsplus/stdlib/prelude/Separate"

/**
 * @tsplus static Chunk.Ops Separate
 */
export const Separate = HKT.instance<P.Separate<Chunk.HKT>>({
  separate: (fa) => fa.separate
})
