/**
 * AssociativeIdentity for `Option<A>`
 *
 * @tsplus static Option/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(
  M: AssociativeIdentity<A> | "First" | "Last"
): AssociativeIdentity<Option<A>> {
  switch (M) {
    case "First": {
      return AssociativeIdentity.fromAssociative(Option.none, Option.getAssociative<A>("First"))
    }
    case "Last": {
      return AssociativeIdentity.fromAssociative(Option.none, Option.getAssociative<A>("Last"))
    }
  }
  return AssociativeIdentity.fromAssociative(Option.some(M.identity), Option.getAssociative(M))
}
