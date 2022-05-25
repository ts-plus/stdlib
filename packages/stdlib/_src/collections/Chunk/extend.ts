/**
 * @tsplus fluent Chunk extend
 */
export function extend_<A, B>(self: Chunk<A>, f: (chunk: Chunk<A>) => B): Chunk<B> {
  return Chunk.from(self.mapWithIndex((i, _) => f(Chunk.from(self.skip(i)))))
}

/**
 * @tsplus static Chunk/Aspects extend
 */
export const extend = Pipeable(extend_)
