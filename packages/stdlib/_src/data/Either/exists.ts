/**
 * Returns `false` if `Left` or returns the result of the application of the
 * given predicate to the `Right` value.
 *
 * @tsplus fluent Either exists
 */
export function exists_<E, A>(self: Either<E, A>, f: Predicate<A>): boolean {
  return self.isLeft() ? false : f(self.right);
}

/**
 * Returns `false` if `Left` or returns the result of the application of the
 * given predicate to the `Right` value.
 *
 * @tsplus static Either/Aspects exists
 */
export const exists = Pipeable(exists_);
