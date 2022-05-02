/**
 * Derive an `AssociativeIdentity` from `Associative` and `identity`.
 *
 * @tsplus static AssociativeIdentity/Ops fromAssociative
 */
export function fromAssociative<A>(identity: A, associative: Associative<A>): AssociativeIdentity<A> {
  return AssociativeIdentity(identity, associative.combine);
}
