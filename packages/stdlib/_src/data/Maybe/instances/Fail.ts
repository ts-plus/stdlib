import type * as P from "@tsplus/stdlib/prelude/FX/Fail"

/**
 * @tsplus static Maybe.Ops Fail
 */
export const Fail = HKT.instance<P.Fail<Maybe.HKT>>({
  fail: () => Maybe.none
})
