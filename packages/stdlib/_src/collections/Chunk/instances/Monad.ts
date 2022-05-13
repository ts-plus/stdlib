import type * as P from "@tsplus/stdlib/prelude/Monad";

/**
 * @tsplus static Chunk/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Chunk.HKT>>({
  ...Chunk.Any,
  ...Chunk.Covariant,
  ...Chunk.AssociativeFlatten
});
