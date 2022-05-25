/**
 * Referential equality check.
 *
 * @tsplus operator Chunk ==
 * @tsplus fluent Chunk equals
 */
export function equals_<A, B>(self: Chunk<A>, that: Chunk<B>): boolean {
  return self.corresponds(that, Equals.equals)
}

/**
 * Referential equality check
 *
 * @tsplus static Chunk/Aspects equals
 */
export const equals = Pipeable(equals_)
