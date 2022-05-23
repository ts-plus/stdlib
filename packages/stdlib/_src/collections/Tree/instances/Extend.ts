import type * as P from "@tsplus/stdlib/prelude/Extend";

/**
 * @tsplus static Tree/Ops Extend
 */
export const Extend = HKT.instance<P.Extend<Tree.HKT>>({
  extend: Tree.$.extend
});
