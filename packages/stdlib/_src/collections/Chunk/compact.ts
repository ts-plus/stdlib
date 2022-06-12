/**
 * Filter out optional values
 *
 * @tsplus getter Chunk compact
 */
export function compact<A>(self: Chunk<Option<A>>): Chunk<A> {
  return self.collect((x: Option<A>) => x)
}
