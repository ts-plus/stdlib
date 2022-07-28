import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth"

/**
 * @tsplus static Chunk.Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Chunk.HKT>>({
  both: Chunk.$.zip
})
