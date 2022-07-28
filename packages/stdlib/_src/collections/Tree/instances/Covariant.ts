import type * as P from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus static Tree.Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Tree.HKT>>({
  map: Tree.$.map
})
