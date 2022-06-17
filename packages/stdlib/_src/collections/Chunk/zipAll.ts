/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @tsplus fluent Chunk zipAll
 */
export function zipAll_<A, B>(
  self: Chunk<A>,
  that: Chunk<B>
): Chunk<Tuple<[Maybe<A>, Maybe<B>]>> {
  return self.zipAllWith(
    that,
    (a, b) => Tuple(Maybe.some(a), Maybe.some(b)),
    (a) => Tuple(Maybe.some(a), Maybe.none),
    (b) => Tuple(Maybe.none, Maybe.some(b))
  )
}

/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @tsplus static Chunk/Aspects zipAll
 */
export const zipAll = Pipeable(zipAll_)
