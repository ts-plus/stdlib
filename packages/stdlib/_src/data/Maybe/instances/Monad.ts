import type * as P from "@tsplus/stdlib/prelude/Monad"

/**
 * @tsplus static Maybe.Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Maybe.HKT>>({
  ...Maybe.Covariant,
  ...Maybe.IdentityFlatten
})
