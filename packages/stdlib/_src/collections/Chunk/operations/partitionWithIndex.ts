/**
 * Separate elements based on a predicate that also exposes the index of the
 * element.
 *
 * @tsplus static Chunk.Aspects partitionWithIndex
 * @tsplus pipeable Chunk partitionWithIndex
 */
export function partitionWithIndex<A>(f: PredicateWithIndex<number, A>) {
  return (self: Chunk<A>): readonly [Chunk<A>, Chunk<A>] => {
    const left: Array<A> = []
    const right: Array<A> = []
    for (let i = 0; i < self.length; i++) {
      const a = self.unsafeGet(i)!
      if (f(i, a)) {
        right.push(a)
      } else {
        left.push(a)
      }
    }
    return [Chunk.from(left), Chunk.from(right)]
  }
}
