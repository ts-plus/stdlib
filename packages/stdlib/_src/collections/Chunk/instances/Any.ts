import type * as P from "@tsplus/stdlib/prelude/Any";

/**
 * @tsplus static Chunk/Ops Any
 */
export const Any = HKT.instance<P.Any<Chunk.HKT>>({
  any: () => Chunk.single({})
});
