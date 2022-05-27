/**
 * @tsplus type Identity
 */
export interface Identity<A> extends HKT.Generic<IdentityF, unknown, never, A> {
  readonly value: A
  readonly [HKT.T]?: Identity<HKT._A<this>>
}

/**
 * @tsplus type Identity/Ops
 */
export interface IdentityOps {}
export const Identity: IdentityOps = {}

export interface IdentityF extends Identity<any> {}

/**
 * @tsplus static Identity/Ops Covariant
 */
export const CovariantIdentity = HKT.instance<Covariant<IdentityF>>({
  map: (a, f) => ({
    value: f(a.value)
  })
})
