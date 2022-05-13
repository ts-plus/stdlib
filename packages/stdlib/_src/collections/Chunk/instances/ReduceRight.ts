import type * as P from "@tsplus/stdlib/prelude/ReduceRight";

/**
 * @tsplus static Chunk/Ops ReduceRight
 */
export const ReduceRight = HKT.instance<P.ReduceRight<Chunk.HKT>>({
  reduceRight: Chunk.$.reduceRight
});
