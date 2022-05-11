import type * as P from "@tsplus/stdlib/prelude/Monad";

/**
 * @tsplus static ImmutableArray/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<ImmutableArray.HKT>>({
  ...ImmutableArray.Any,
  ...ImmutableArray.Covariant,
  ...ImmutableArray.AssociativeFlatten
});
