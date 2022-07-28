import type * as P from "@tsplus/stdlib/prelude/Applicative"

/**
 * @tsplus static Either.Ops Applicative
 */
export const Applicative = HKT.instance<P.Applicative<Either.HKT>>({
  ...Either.Any,
  ...Either.Covariant,
  ...Either.AssociativeBoth
})
