/**
 * Drops the last `n` elements.
 *
 * @tsplus static Chunk.Aspects dropRight
 * @tsplus pipeable Chunk dropRight
 */
export function dropRight(n: number) {
  return <A>(self: Chunk<A>): Chunk<A> => self.take(Math.max(0, self.length - n))
}
