/**
 * Returns two splits of this chunk at the specified index.
 *
 * @tsplus static Chunk.Aspects splitAt
 * @tsplus pipeable Chunk splitAt
 */
export function splitAt(n: number) {
  return <A>(self: Chunk<A>): readonly [Chunk<A>, Chunk<A>] => [self.take(n), self.drop(n)]
}
