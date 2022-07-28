/**
 * @tsplus static Chunk.Ops forEachF
 */
export const forEachF: ForEach.Fn<Chunk.HKT> = (G) => (f) => Chunk.forEachWithIndexF(G)((_, a) => f(a))
