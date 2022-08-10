export function getEquivalence<E, A>(
  EE: Equivalence<E>,
  EA: Equivalence<A>
): Equivalence<Either<E, A>> {
  return Equivalence((x, y) =>
    x === y ||
    (x.isLeft() ?
      y.isLeft() && EE.equals(x.left, y.left) :
      y.isRight() && EA.equals(x.right, y.right))
  )
}
