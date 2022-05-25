/**
 * Folds an `AssociativeIdentity` through an `Either`.
 *
 * @tsplus fluent Either foldMap
 */
export function foldMap_<E, A, M>(self: Either<E, A>, I: AssociativeIdentity<M>) {
  return (f: (a: A) => M): M => self.isLeft() ? I.identity : f(self.right)
}

/**
 * Folds an `AssociativeIdentity` through an `Either`.
 *
 * @tsplus static Either/Aspects foldMap
 */
export function foldMap<M>(I: AssociativeIdentity<M>) {
  return <A>(f: (a: A) => M) => <E>(self: Either<E, A>): M => self.foldMap(I)(f)
}
