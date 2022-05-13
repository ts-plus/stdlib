import type * as P from "@tsplus/stdlib/prelude/WiltableWithIndex";

/**
 * @tsplus static Chunk/Ops WiltableWithIndex
 */
export const WiltableWithIndex = HKT.instance<P.WiltableWithIndex<number, Chunk.HKT>>({
  separateWithIndexF: Chunk.separateWithIndexF
});
