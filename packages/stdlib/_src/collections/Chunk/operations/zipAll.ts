/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @tsplus static Chunk.Aspects zipAll
 * @tsplus pipeable Chunk zipAll
 */
export function zipAll<B>(that: Chunk<B>) {
  return <A>(self: Chunk<A>): Chunk<readonly [Maybe<A>, Maybe<B>]> => {
    return self.zipAllWith(
      that,
      (a, b) => [Maybe.some(a), Maybe.some(b)],
      (a) => [Maybe.some(a), Maybe.none],
      (b) => [Maybe.none, Maybe.some(b)]
    )
  }
}
