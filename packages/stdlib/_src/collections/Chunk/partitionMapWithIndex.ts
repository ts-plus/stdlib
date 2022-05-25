/**
 * Separate elements based on a map function that also exposes the index of the
 * element.
 *
 * @tsplus fluent Chunk partitionMapWithIndex
 */
export function partitionMapWithIndex_<A, B, C>(
  self: Chunk<A>,
  f: (i: number, a: A) => Either<B, C>
): Tuple<[Chunk<B>, Chunk<C>]> {
  const left: Array<B> = []
  const right: Array<C> = []
  for (let i = 0; i < self.length; i++) {
    const e = f(i, self.unsafeGet(i))
    if (e._tag === "Left") {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return Tuple(Chunk.from(left), Chunk.from(right))
}

/**
 * Separate elements based on a map function that also exposes the index of the
 * element.
 *
 * @tsplus static Chunk/Aspects partitionMapWithIndex
 */
export const partitionMapWithIndex = Pipeable(partitionMapWithIndex_)
