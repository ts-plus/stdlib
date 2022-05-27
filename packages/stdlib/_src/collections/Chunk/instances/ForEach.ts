import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static Chunk/Ops ForEach
 */
export const ForEach = HKT.instance<P.ForEach<Chunk.HKT>>({
  ...Chunk.Covariant,
  forEach: Chunk.forEachF
})
