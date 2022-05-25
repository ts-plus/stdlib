/**
 * Returns the first element of this chunk if it exists.
 *
 * @tsplus getter Chunk head
 */
export function head<A>(self: Chunk<A>): Option<A> {
  return self.get(0)
}
