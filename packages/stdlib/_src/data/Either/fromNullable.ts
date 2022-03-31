/**
 * Takes a default and a nullable value, if the value is not nully, turn it
 * into a `Right`, if the value is nully use the provided default as a `Left`.
 *
 * @tsplus static Either/Ops fromNullable
 */
export function fromNullable<A, E>(a: A, e: LazyArg<E>): Either<E, NonNullable<A>> {
  return a == null ? Either.left(e()) : Either.right(a as NonNullable<A>);
}
