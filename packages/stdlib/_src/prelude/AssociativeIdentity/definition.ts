/**
 * Equivalent to a Monoid
 */
export interface AssociativeIdentity<A> extends Associative<A> {
  readonly Law: Associative<A>["Law"] & { readonly Identity: "Identity"; };
  readonly identity: A;
}
