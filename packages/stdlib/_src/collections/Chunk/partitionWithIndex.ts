/**
 * Separate elements based on a predicate that also exposes the index of the
 * element.
 *
 * @tsplus fluent Chunk partitionWithIndex
 */
export function partitionWithIndex_<A>(
  self: Chunk<A>,
  f: PredicateWithIndex<number, A>
): Tuple<[Chunk<A>, Chunk<A>]> {
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
  return Tuple(Chunk.from(left), Chunk.from(right))
}

/**
 * Separate elements based on a predicate that also carry the index
 *
 * @tsplus static Chunk/Aspects partitionWithIndex
 */
export const partitionWithIndex = Pipeable(partitionWithIndex_)
