/**
 * @tsplus static Maybe/Ops getEquivalence
 */
export function getEquivalence<A>(E: Equivalence<A>): Equivalence<Maybe<A>> {
  return Equivalence((x, y) => x === y || x.isNone() ? y.isNone() : y.isNone() ? false : E.equals(x.value, y.value))
}
