/**
 * Returns a `Ord` for an `ImmutableArray<A>` given an `Ord<A>`.
 *
 * @tsplus static ImmutableArray/Ops getOrd
 */
export function getOrd<A>(O: Ord<A>): Ord<ImmutableArray<A>> {
  return Ord((a, b) => {
    const aLen = a.array.length
    const bLen = b.array.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i = i + 1) {
      const ordering = O.compare(a.array[i]!, b.array[i]!)
      if (ordering !== 0) {
        return ordering
      }
    }
    return Ord.number.compare(aLen, bLen)
  })
}
