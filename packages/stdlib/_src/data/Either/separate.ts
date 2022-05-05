/**
 * Separates an `Either<E, Either<A, B>>` into a
 * `Tuple<[Either<E, A>, Either<E, B>]>` given an `AssociativeIdentity<E>`.
 *
 * @tsplus fluent Either separate
 */
export function separate_<E, A, B>(
  self: Either<E, Either<A, B>>,
  M: AssociativeIdentity<E>
): Tuple<[Either<E, A>, Either<E, B>]> {
  const empty = Either.left(M.identity);
  return self.isLeft()
    ? Tuple<[Either<E, A>, Either<E, B>]>(self, self)
    : self.right.isLeft()
    ? Tuple<[Either<E, A>, Either<E, B>]>(Either.right(self.right.left), empty)
    : Tuple<[Either<E, A>, Either<E, B>]>(empty, Either.right(self.right.right));
}

/**
 * Separates an `Either<E, Either<A, B>>` into a
 * `Tuple<[Either<E, A>, Either<E, B>]>` given an `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Aspects separate
 */
export const separate = Pipeable(separate_);
