/**
 * Merges `Left<E> | Right<B>` into `A | B`
 *
 * @tsplus fluent Either merge
 */
export function merge<E, A>(self: Either<E, A>): E | A {
  return self.fold(
    identity,
    identity
  );
}
