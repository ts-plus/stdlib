import type * as P from "@tsplus/stdlib/prelude/Compact"

/**
 * @tsplus static Chunk/Ops Compact
 */
export const Compact = HKT.instance<P.Compact<Chunk.HKT>>({
  compact: (fa) => fa.compact()
})
