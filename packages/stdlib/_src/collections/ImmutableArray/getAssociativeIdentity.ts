/**
 * Returns an `AssociativeIdentity` for an `ImmutableArray<A>`.
 *
 * @tsplus static ImmutableArray/Ops getAssociativeIdentity
 */
export function getAssociativeIdentity<A>(): AssociativeIdentity<ImmutableArray<A>> {
  return AssociativeIdentity(ImmutableArray.empty<A>(), (a, b) => a.concat(b));
}
