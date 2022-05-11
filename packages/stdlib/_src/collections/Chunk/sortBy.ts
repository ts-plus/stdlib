/**
 * Sort the elements of an array in increasing order, where elements are
 * compared using first `ords[0]`, then `ords[1]`, then `ords[2]`, etc.
 *
 * @tsplus fluent Chunk sortBy
 */
export function sortBy_<A>(
  self: Chunk<A>,
  ...ords: Array<Ord<A>>
): Chunk<A> {
  const O = Ord.consecutive(...ords);
  return self.sort(O);
}

/**
 * Sort the elements of an array in increasing order, where elements are
 * compared using first `ords[0]`, then `ords[1]`, then `ords[2]`, etc.
 *
 * @tsplus static Chunk/Aspects sortBy
 */
export const sortBy = Pipeable(sortBy_);
