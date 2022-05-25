/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static Option/Ops fromNullable
 */
export function fromNullable<A>(a: A): Option<NonNullable<A>> {
  return a == null ? Option.none : Option.some(a as NonNullable<A>)
}
