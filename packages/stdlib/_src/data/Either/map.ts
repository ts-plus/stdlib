/**
 * Use `A => B` to transform `Either<E, A>` to `Either<E, B>`.
 *
 * @tsplus fluent Either map
 */
export function map_<E, A, B>(self: Either<E, A>, f: (a: A) => B): Either<E, B> {
  return self.isLeft() ? self : Either.right(f(self.right))
}

/**
 * Use `A => B` to transform `Either<E, A>` to `Either<E, B>`.
 *
 * @tsplus static Either/Aspects map
 */
export const map = Pipeable(map_)
