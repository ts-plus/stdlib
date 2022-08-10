/**
 * Associative for `Maybe<A>`
 *
 * @tsplus static Maybe.Ops getAssociative
 */
export function getAssociative<A>(S: Associative<A> | "First" | "Last"): Associative<Maybe<A>> {
  switch (S) {
    case "First": {
      return Associative((x, y) => (x.isNone() ? y : x))
    }
    case "Last": {
      return Associative((x, y) => (y.isNone() ? x : y))
    }
  }
  return Associative((x, y) =>
    x.isSome() && y.isSome() ? Maybe.some(S.combine(x.value, y.value)) : Maybe.none
  )
}
