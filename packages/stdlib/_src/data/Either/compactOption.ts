/**
 * Compact an `Either<E, Option<A>>`  to an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus fluent Either compactOption
 */
export function compactOption_<E, A>(self: Either<E, Option<A>>, M: AssociativeIdentity<E>): Either<E, A> {
  return self.isLeft() ? self : self.right._tag === "None" ? Either.left(M.identity) : Either.right(self.right.value)
}

/**
 * Compact an `Either<E, Option<A>>`  to an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Aspects compactOption
 */
export const compactOption = Pipeable(compactOption_)
