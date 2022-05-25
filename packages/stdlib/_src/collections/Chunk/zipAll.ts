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
): Chunk<Tuple<[Option<A>, Option<B>]>> {
  return self.zipAllWith(
    that,
    (a, b) => Tuple(Option.some(a), Option.some(b)),
    (a) => Tuple(Option.some(a), Option.none),
    (b) => Tuple(Option.none, Option.some(b))
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
