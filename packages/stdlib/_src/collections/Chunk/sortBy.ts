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
  return self.sort(
    ords.reduce((acc, curr) =>
      Ord((x, y) => {
        const a = acc.compare(x, y);
        const b = curr.compare(x, y);
        return a !== 0 ? a : b;
      }), Ord(() => 0))
  );
}

/**
 * Sort the elements of an array in increasing order, where elements are
 * compared using first `ords[0]`, then `ords[1]`, then `ords[2]`, etc.
 *
 * @tsplus static Chunk/Aspects sortBy
 */
export const sortBy = Pipeable(sortBy_);
