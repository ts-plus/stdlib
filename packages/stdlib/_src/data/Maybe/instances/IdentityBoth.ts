import type * as P from "@tsplus/stdlib/prelude/IdentityBoth"

/**
 * @tsplus static Maybe.Ops IdentityBoth
 */
export const IdentityBoth = HKT.instance<P.IdentityBoth<Maybe.HKT>>({
  ...Maybe.Any,
  ...Maybe.AssociativeBoth
})
