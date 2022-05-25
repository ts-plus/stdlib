import type * as P from "@tsplus/stdlib/prelude/IdentityFlatten"

/**
 * @tsplus static Option/Ops IdentityFlatten
 */
export const OptionIdentityFlatten = HKT.instance<P.IdentityFlatten<Option.HKT>>({
  ...Option.Any,
  ...Option.AssociativeFlatten
})
