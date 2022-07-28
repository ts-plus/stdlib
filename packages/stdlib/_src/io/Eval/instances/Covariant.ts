import type * as P from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus static Eval.Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Eval.HKT>>({
  map: Eval.$.map
})
