/**
 * Folds an `AssociativeIdentity` through an `Either`.
 *
 * @tsplus static Either.Aspects foldMap
 * @tsplus pipeable Either foldMap
 */
export function foldMap<A, M>(I: AssociativeIdentity<M>, f: (a: A) => M) {
  return <E>(self: Either<E, A>): M => self.isLeft() ? I.identity : f(self.right)
}
