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
 * @tsplus static Option/Ops getFirstAssociativeIdentity
 */
export function getFirstAssociativeIdentity<A>(): AssociativeIdentity<Option<A>> {
  return AssociativeIdentity.fromAssociative(Option.none, Option.getFirstAssociative<A>())
}
