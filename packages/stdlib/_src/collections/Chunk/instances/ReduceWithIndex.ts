import type * as P from "@tsplus/stdlib/prelude/ReduceWithIndex";

/**
 * @tsplus static Chunk/Ops ReduceWithIndex
 */
export const ReduceWithIndex = HKT.instance<P.ReduceWithIndex<number, Chunk.HKT>>({
  reduceWithIndex: Chunk.$.reduceWithIndex
});
