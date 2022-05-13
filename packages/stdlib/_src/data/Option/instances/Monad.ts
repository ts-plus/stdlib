import type * as P from "@tsplus/stdlib/prelude/Monad";

/**
 * @tsplus static Option/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Option.HKT>>({
  ...Option.Covariant,
  ...Option.IdentityFlatten
});
