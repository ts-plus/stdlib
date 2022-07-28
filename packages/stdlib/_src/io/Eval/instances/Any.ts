import type * as P from "@tsplus/stdlib/prelude/Any"

/**
 * @tsplus static Eval.Ops Any
 */
export const Any = HKT.instance<P.Any<Eval.HKT>>({
  any: () => Eval.succeedNow({})
})
