/**
 * @tsplus static NonEmptyImmutableArray.Ops getEquivalence
 */
export function getEquivalence<A>(E: Equivalence<A>): Equivalence<NonEmptyImmutableArray<A>> {
  return Equivalence((xs, ys) =>
    xs === ys || (xs.array.length === ys.array.length && xs.array.every((x, i) => E.equals(x, ys.array[i]!)))
  )
}
