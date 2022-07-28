/**
 * Derives an `Equivalence` over the `ImmutableArray` of a given element type
 * from the `Equivalence` of that type. The derived `Equivalence` defines two
 * arrays as equal if all elements of both arrays are compared equal pairwise
 * with the given `Equivalence`. In case of arrays of different lengths, the
 * result is non equality.
 *
 * @tsplus static ImmutableArray.Ops getEquivalence
 */
export function getEquivalnce<A>(E: Equivalence<A>): Equivalence<ImmutableArray<A>> {
  return Equivalence((xs, ys) =>
    xs === ys || (xs.array.length === ys.array.length && xs.array.every((x, i) => E.equals(x, ys.array[i]!)))
  )
}
