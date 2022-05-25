import type * as P from "@tsplus/stdlib/prelude/Monad"

/**
 * @tsplus static Tree/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Tree.HKT>>({
  ...Tree.Any,
  ...Tree.Covariant,
  ...Tree.AssociativeFlatten
})
