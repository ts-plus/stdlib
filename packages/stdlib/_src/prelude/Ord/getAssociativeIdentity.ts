/**
 * Returns an `AssociativeIdentity` such that:
 * - `combine(ord2)(ord1)` will order first by `ord1`, and then by `ord2`
 * - `identity` is an `Ord` that always considers compared elements equal
 *
 * @tsplus static Ord/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A = never>(): AssociativeIdentity<Ord<A>> {
  return AssociativeIdentity.fromAssociative(Ord(() => 0), Ord.getAssociative<A>());
}
