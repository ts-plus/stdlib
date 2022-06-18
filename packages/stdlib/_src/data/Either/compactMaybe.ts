/**
 * Compact an `Either<E, Maybe<A>>`  to an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus fluent Either compactMaybe
 */
export function compactMaybe_<E, A>(self: Either<E, Maybe<A>>, M: AssociativeIdentity<E>): Either<E, A> {
  return self.isLeft() ? self : self.right._tag === "None" ? Either.left(M.identity) : Either.right(self.right.value)
}

/**
 * Compact an `Either<E, Maybe<A>>`  to an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Aspects compactMaybe
 */
export const compactMaybe = Pipeable(compactMaybe_)
