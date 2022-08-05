/**
 * Referential equality check.
 *
 * @tsplus pipeable-operator Chunk ==
 * @tsplus static Chunk.Aspects equals
 * @tsplus pipeable Chunk equals
 */
export function equals<A, B>(that: Chunk<B>) {
  return (self: Chunk<A>): boolean => self.corresponds(that, Equals.equals)
}
