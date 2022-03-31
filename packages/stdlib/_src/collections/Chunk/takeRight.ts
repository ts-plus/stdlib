/**
 * Takes the last `n` elements.
 *
 * @tsplus fluent Chunk takeRight
 */
export function takeRight_<A>(self: Chunk<A>, n: number): Chunk<A> {
  return self.drop(self.size - n);
}

/**
 * Takes the last `n` elements.
 *
 * @tsplus static Chunk/Aspects takeRight
 */
export const takeRight = Pipeable(takeRight_);
