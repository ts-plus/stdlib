import type * as P from "@tsplus/stdlib/prelude/Applicative"

/**
 * @tsplus static Maybe.Ops Applicative
 */
export const Applicative = HKT.instance<P.Applicative<Maybe.HKT>>({
  ...Maybe.Covariant,
  ...Maybe.IdentityBoth
})
