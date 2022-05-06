/**
 * `Associative` returning the left-most non-`None` value
 *
 * | x       | y       | combine(y)(x) |
 * | ------- | ------- | ------------- |
 * | none    | none    | none          |
 * | some(a) | none    | some(a)       |
 * | none    | some(a) | some(a)       |
 * | some(a) | some(b) | some(a)       |
 *
 * @tsplus static Option/Ops getLastAssociative
 */
export function getLastAssociative<A>(): Associative<Option<A>> {
  return Associative((x, y) => (x.isNone() ? y : x));
}
