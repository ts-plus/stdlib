import type * as P from "@tsplus/stdlib/prelude/Witherable";

/**
 * @tsplus static Chunk/Ops Witherable
 */
export const Witherable = HKT.instance<P.Witherable<Chunk.HKT>>({
  compactF: Chunk.compactF
});
