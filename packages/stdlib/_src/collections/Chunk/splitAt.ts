/**
 * Returns two splits of this chunk at the specified index.
 *
 * @tsplus fluent Chunk splitAt
 */
export function splitAt_<A>(self: Chunk<A>, n: number): Tuple<[Chunk<A>, Chunk<A>]> {
  return Tuple(self.take(n), self.drop(n))
}

/**
 * Returns two splits of this chunk at the specified index.
 *
 * @tsplus static Chunk/Aspects splitAt
 */
export const splitAt = Pipeable(splitAt_)
