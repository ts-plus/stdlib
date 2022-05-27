/**
 * Associative for `Option<A>`
 *
 * @tsplus static Option/Ops getAssociative
 */
export function getAssociative<A>(S: Associative<A> | "First" | "Last"): Associative<Option<A>> {
  switch (S) {
    case "First": {
      return Associative((x, y) => (x.isNone() ? y : x))
    }
    case "Last": {
      return Associative((x, y) => (y.isNone() ? x : y))
    }
  }
  return Associative((x, y) => x.isSome() && y.isSome() ? Option.some(S.combine(x.value, y.value)) : Option.none)
}
