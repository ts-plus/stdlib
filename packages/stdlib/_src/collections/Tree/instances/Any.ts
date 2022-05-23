import type * as P from "@tsplus/stdlib/prelude/Any";

/**
 * @tsplus static Tree/Ops Any
 */
export const Any = HKT.instance<P.Any<Tree.HKT>>({
  any: () => Tree({})
});
