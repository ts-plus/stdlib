/**
 * AssociativeIdentity for `Maybe<A>`
 *
 * @tsplus static Maybe.Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(
  M: AssociativeIdentity<A> | "First" | "Last"
): AssociativeIdentity<Maybe<A>> {
  switch (M) {
    case "First": {
      return AssociativeIdentity.fromAssociative(Maybe.none, Maybe.getAssociative<A>("First"))
    }
    case "Last": {
      return AssociativeIdentity.fromAssociative(Maybe.none, Maybe.getAssociative<A>("Last"))
    }
  }
  return AssociativeIdentity.fromAssociative(Maybe.some(M.identity), Maybe.getAssociative(M))
}
