import type * as P from "@tsplus/stdlib/prelude/FX/Fail"

/**
 * @tsplus static Either/Ops Fail
 */
export const Fail = HKT.instance<P.Fail<Either.HKT>>({
  fail: Either.left
})
