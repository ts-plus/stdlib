/**
 * Drops the last `n` elements.
 *
 * @tsplus fluent Chunk dropRight
 */
export function dropRight_<A>(self: Chunk<A>, n: number) {
  return self.take(Math.max(0, self.length - n))
}

/**
 * Drops the last `n` elements.
 *
 * @tsplus static Chunk/Aspects dropRight
 */
export const dropRight = Pipeable(dropRight_)
