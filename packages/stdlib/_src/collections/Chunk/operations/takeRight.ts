/**
 * Takes the last `n` elements.
 *
 * @tsplus static Chunk.Aspects takeRight
 * @tsplus pipeable Chunk takeRight
 */
export function takeRight(n: number) {
  return <A>(self: Chunk<A>): Chunk<A> => self.drop(self.size - n)
}
