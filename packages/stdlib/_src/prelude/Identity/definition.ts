/**
 * @tsplus type Identity
 */
export type Identity<A> = A;

/**
 * @tsplus type Identity/Ops
 */
export interface IdentityOps {}
export const Identity: IdentityOps = {};

export interface IdentityF extends HKT {
  readonly type: Identity<this["A"]>;
}

/**
 * @tsplus static Identity/Ops Covariant
 */
export const CovariantIdentity = HKT.instance<Covariant<IdentityF>>({
  map: (f) => (a) => f(a)
});
