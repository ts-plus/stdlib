/**
 * Sort the elements of an array in increasing order, where elements are
 * compared using first `ords[0]`, then `ords[1]`, then `ords[2]`, etc.
 *
 * @tsplus static Chunk.Aspects sortBy
 * @tsplus pipeable Chunk sortBy
 */
export function sortBy<A>(...ords: Array<Ord<A>>) {
  return (self: Chunk<A>): Chunk<A> => {
    const O = Ord.consecutive(...ords)
    return self.sort(O)
  }
}
