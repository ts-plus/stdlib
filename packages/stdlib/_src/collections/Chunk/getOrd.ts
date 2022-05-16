/**
 * @tsplus static Chunk/Ops getOrd
 */
export function getOrd<A>(O: Ord<A>): Ord<Chunk<A>> {
  return Ord((x, y) => {
    const xLen = x.length;
    const yLen = y.length;
    const len = Math.min(xLen, yLen);
    for (let i = 0; i < len; i++) {
      const ordering = O.compare(x.unsafeGet(i)!, y.unsafeGet(i)!);
      if (ordering !== 0) {
        return ordering;
      }
    }
    return Ord.number.compare(xLen, yLen);
  });
}
