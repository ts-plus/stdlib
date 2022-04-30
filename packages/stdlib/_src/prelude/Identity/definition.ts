/**
 * Equivalent to a `Monoid`.
 *
 * @tsplus type Identity
 */
export interface Identity<A> extends Associative<A> {
  readonly identity: A;
}

/**
 * @tsplus type Identity/Ops
 */
export interface IdentityOps {}
export const Identity: IdentityOps = {};

export interface IdentityF extends HKT {
  readonly type: Identity<this["A"]>;
}
