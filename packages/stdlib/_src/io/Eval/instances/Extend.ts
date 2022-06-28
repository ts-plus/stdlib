import type * as P from "@tsplus/stdlib/prelude/Extend"

/**
 * @tsplus static Eval/Ops Extend
 */
export const Extend = HKT.instance<P.Extend<Eval.HKT>>({
  extend: Eval.$.extend
})
