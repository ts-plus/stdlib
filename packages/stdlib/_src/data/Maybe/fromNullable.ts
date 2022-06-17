/**
 * Constructs a new `Maybe` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static Maybe/Ops fromNullable
 */
export function fromNullable<A>(a: A): Maybe<NonNullable<A>> {
  return a == null ? Maybe.none : Maybe.some(a as NonNullable<A>)
}
