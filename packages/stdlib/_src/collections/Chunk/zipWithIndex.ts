/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @tsplus fluent Chunk zipWithIndex
 */
export function zipWithIndex<A>(self: Chunk<A>): Chunk<Tuple<[A, number]>> {
  return self.zipWithIndexOffset(0)
}
