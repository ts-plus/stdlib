/**
 * @tsplus static NonEmptyImmutableArray.Ops getOrd
 */
export function getOrd<A>(O: Ord<A>): Ord<NonEmptyImmutableArray<A>> {
  return Ord((x, y) => {
    const xLen = x.array.length
    const yLen = y.array.length
    const len = Math.min(xLen, yLen)
    for (let i = 0; i < len; i++) {
      const ordering = O.compare(x.array[i]!, y.array[i]!)
      if (ordering !== 0) {
        return ordering
      }
    }
    return Ord.number.compare(xLen, yLen)
  })
}
