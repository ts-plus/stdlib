import type * as P from "@tsplus/stdlib/prelude/Reduce"

/**
 * @tsplus static Tree.Ops Reduce
 */
export const Reduce = HKT.instance<P.Reduce<Tree.HKT>>({
  reduce: Tree.$.reduce
})
