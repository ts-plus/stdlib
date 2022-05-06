/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or
 * `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`.
 *
 * @tsplus static Option/Ops __call
 */
export function apply<A>(a: A): Option<NonNullable<A>> {
  return Option.fromNullable(a);
}
