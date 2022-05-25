/**
 * Constructs an `Equivalence<Either<A, B>>` given an `Equivalence<A>` and an
 * `Equivalence<B>`. The instance will compare the `Either<A, B>` values and if
 * both are `Right` or `Left` compare them for equality.
 *
 * @tsplus fluent Equivalence orElseEither
 */
export function orElseEither_<A, B>(
  self: Equivalence<A>,
  that: LazyArg<Equivalence<B>>
): Equivalence<Either<A, B>> {
  return Equivalence((ex, ey) =>
    ex._tag === "Left" && ey._tag === "Left"
      ? self.equals(ex.left, ey.left)
      : ex._tag === "Right" && ey._tag === "Right"
      ? that().equals(ex.right, ey.right)
      : false
  )
}

/**
 * Constructs an `Equivalence<Either<A, B>>` given an `Equivalence<A>` and an
 * `Equivalence<B>`. The instance will compare the `Either<A, B>` values and if
 * both are `Right` or `Left` compare them for equality.
 *
 * @tsplus static Equivalence/Aspects orElseEither
 */
export const orElseEither = Pipeable(orElseEither_)
