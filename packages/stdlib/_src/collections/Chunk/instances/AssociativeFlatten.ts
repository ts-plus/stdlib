import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten"

/**
 * @tsplus static Chunk/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<Chunk.HKT>>({
  flatten: (ffa) => ffa.flatten
})
