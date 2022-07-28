import type * as P from "@tsplus/stdlib/prelude/IdentityFlatten"

/**
 * @tsplus static Maybe.Ops IdentityFlatten
 */
export const OptionIdentityFlatten = HKT.instance<P.IdentityFlatten<Maybe.HKT>>({
  ...Maybe.Any,
  ...Maybe.AssociativeFlatten
})
