/**
 * `Identity` returning the left-most non-`None` value
 *
 * | x       | y       | combine(y)(x) |
 * | ------- | ------- | ------------- |
 * | none    | none    | none          |
 * | some(a) | none    | some(a)       |
 * | none    | some(a) | some(a)       |
 * | some(a) | some(b) | some(a)       |
 *
 * @tsplus static Option/Ops getLastAssociativeIdentity
 */
export function getLastAssociativeIdentity<A>(): AssociativeIdentity<Option<A>> {
  return AssociativeIdentity.fromAssociative(Option.none, Option.getLastAssociative<A>())
}
