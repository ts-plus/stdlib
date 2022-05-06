/**
 * `Apply` AssociativeIdentity for `Option<A>`
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @tsplus static Option/Ops getApplyAssociativeIdentity
 */
export function getApplyAssociativeIdentity<A>(M: AssociativeIdentity<A>): AssociativeIdentity<Option<A>> {
  return AssociativeIdentity.fromAssociative(Option.some(M.identity), Option.getApplyAssociative(M));
}
