/**
 * Flattens a chunk of chunks into a single chunk by concatenating all chunks.
 *
 * @tsplus getter Chunk flatten
 */
export function flatten<A>(self: Chunk<Chunk<A>>): Chunk<A> {
  return self.flatMap(identity)
}
