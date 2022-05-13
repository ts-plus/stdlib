import type * as P from "@tsplus/stdlib/prelude/Apply";

/**
 * @tsplus static Chunk/Ops Apply
 */
export const Apply = HKT.instance<P.Apply<Chunk.HKT>>({
  ...Chunk.AssociativeBoth,
  ...Chunk.Covariant
});
