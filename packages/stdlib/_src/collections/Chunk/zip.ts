/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @tsplus fluent Chunk zip
 */
export function zip_<A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<Tuple<[A, B]>> {
  return self.zipWith(that, (a, b) => Tuple(a, b))
}

/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @tsplus static Chunk/Aspects zip
 */
export const zip = Pipeable(zip_)
