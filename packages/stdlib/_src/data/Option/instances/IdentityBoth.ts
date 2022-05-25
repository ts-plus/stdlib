import type * as P from "@tsplus/stdlib/prelude/IdentityBoth"

/**
 * @tsplus static Option/Ops IdentityBoth
 */
export const IdentityBoth = HKT.instance<P.IdentityBoth<Option.HKT>>({
  ...Option.Any,
  ...Option.AssociativeBoth
})
