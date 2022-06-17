/**
 * Constructs a new `Maybe` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static Maybe/Ops __call
 */
export function apply<A>(a: A): Maybe<NonNullable<A>> {
  return Maybe.fromNullable(a)
}
