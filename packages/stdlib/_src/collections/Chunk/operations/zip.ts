/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @tsplus static Chunk.Aspects zip
 * @tsplus pipeable Chunk zip
 */
export function zip<B>(that: Chunk<B>) {
  return <A>(self: Chunk<A>): Chunk<[A, B]> => self.zipWith(that, (a, b) => [a, b])
}
