/**
 * Separates an `Either<E, Either<A, B>>` into a
 * `Tuple<[Either<E, A>, Either<E, B>]>` given an `AssociativeIdentity<E>`.
 *
 * @tsplus static Either.Aspects separate
 * @tsplus pipeable Either separate
 */
export function separate<E>(M: AssociativeIdentity<E>) {
  return <A, B>(self: Either<E, Either<A, B>>): readonly [Either<E, A>, Either<E, B>] => {
    const empty = Either.left(M.identity)
    return self.isLeft()
      ? [self, self]
      : self.right.isLeft()
      ? [Either.right(self.right.left), empty]
      : [empty, Either.right(self.right.right)]
  }
}
