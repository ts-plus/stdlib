/**
 * Separate elements based on a map function that also exposes the index of the
 * element.
 *
 * @tsplus static Chunk.Aspects partitionMapWithIndex
 * @tsplus pipeable Chunk partitionMapWithIndex
 */
export function partitionMapWithIndex<A, B, C>(f: (i: number, a: A) => Either<B, C>) {
  return (self: Chunk<A>): readonly [Chunk<B>, Chunk<C>] => {
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
    return [Chunk.from(left), Chunk.from(right)]
  }
}
