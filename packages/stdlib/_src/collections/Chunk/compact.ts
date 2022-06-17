/**
 * Filter out optional values
 *
 * @tsplus getter Chunk compact
 */
export function compact<A>(self: Chunk<Maybe<A>>): Chunk<A> {
  return self.collect((x: Maybe<A>) => x)
}
