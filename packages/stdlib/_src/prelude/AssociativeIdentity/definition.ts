/**
 * Equivalent to a `Monoid`.
 *
 * @tsplus type AssociativeIdentity
 */
export interface AssociativeIdentity<A> extends Associative<A> {
  readonly Law: Associative<A>["Law"] & { readonly Identity: "Identity"; };
  readonly identity: A;
}

/**
 * @tsplus type AssociativeIdentity/Ops
 */
export interface AssociativeIdentityOps {
  <A>(identity: A, combine: (x: A, y: A) => A): AssociativeIdentity<A>;
}
export const AssociativeIdentity: AssociativeIdentityOps = <A>(
  identity: A,
  combine: (x: A, y: A) => A
): AssociativeIdentity<A> => HKT.instance({ identity, combine });
