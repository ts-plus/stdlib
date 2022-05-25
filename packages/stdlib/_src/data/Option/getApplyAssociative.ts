/**
 * `Apply` Associative for `Option<A>`
 *
 * | x       | y       | combine(y)(x)      |
 * | ------- | ------- | ------------------ |
 * | none    | none    | none               |
 * | some(a) | none    | none               |
 * | none    | some(a) | none               |
 * | some(a) | some(b) | some(concat(a, b)) |
 *
 * @tsplus static Option/Ops getApplyAssociative
 */
export function getApplyAssociative<A>(S: Associative<A>): Associative<Option<A>> {
  return Associative((x, y) => x.isSome() && y.isSome() ? Option.some(S.combine(x.value, y.value)) : Option.none)
}
