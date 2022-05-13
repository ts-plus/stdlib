import type * as P from "@tsplus/stdlib/prelude/Monad";

/**
 * @tsplus static Either/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Either.HKT>>({
  ...Either.Any,
  ...Either.Covariant,
  ...Either.AssociativeFlatten
});
