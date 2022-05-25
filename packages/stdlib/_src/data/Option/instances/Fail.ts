import type * as P from "@tsplus/stdlib/prelude/FX/Fail"

/**
 * @tsplus static Option/Ops Fail
 */
export const Fail = HKT.instance<P.Fail<Option.HKT>>({
  fail: () => Option.none
})
