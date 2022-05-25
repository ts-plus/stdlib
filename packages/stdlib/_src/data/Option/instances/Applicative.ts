import type * as P from "@tsplus/stdlib/prelude/Applicative"

/**
 * @tsplus static Option/Ops Applicative
 */
export const Applicative = HKT.instance<P.Applicative<Option.HKT>>({
  ...Option.Covariant,
  ...Option.IdentityBoth
})
