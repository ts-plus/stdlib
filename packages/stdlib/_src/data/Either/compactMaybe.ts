/**
 * Compact an `Either<E, Maybe<A>>`  to an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either.Aspects compactMaybe
 * @tsplus pipeable Either compactMaybe
 */
export function compactMaybe<E>(M: AssociativeIdentity<E>) {
  return <A>(self: Either<E, Maybe<A>>): Either<E, A> =>
    self.isLeft() ?
      self :
      self.right._tag === "None" ?
      Either.left(M.identity) :
      Either.right(self.right.value)
}
