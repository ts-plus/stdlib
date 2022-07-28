import type * as P from "@tsplus/stdlib/prelude/Reduce"

/**
 * @tsplus static Either.Ops Reduce
 */
export const Reduce = HKT.instance<P.Reduce<Either.HKT>>({
  reduce: Either.$.reduce
})
