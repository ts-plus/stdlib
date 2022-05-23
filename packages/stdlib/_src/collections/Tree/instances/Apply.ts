import type * as P from "@tsplus/stdlib/prelude/Apply";

/**
 * @tsplus static Tree/Ops Apply
 */
export const Apply = HKT.instance<P.Apply<Tree.HKT>>({
  ...Tree.AssociativeBoth,
  ...Tree.Covariant
});
