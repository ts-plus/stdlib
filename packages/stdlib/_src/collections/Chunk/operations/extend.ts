/**
 * @tsplus static Chunk.Aspects extend
 * @tsplus pipeable Chunk extend
 */
export function extend<A, B>(f: (chunk: Chunk<A>) => B) {
  return (self: Chunk<A>): Chunk<B> => Chunk.from(self.mapWithIndex((i, _) => f(Chunk.from(self.skip(i)))))
}
