import type * as P from "@tsplus/stdlib/prelude/Witherable"

/**
 * @tsplus static Option/Ops Witherable
 */
export const Witherable = HKT.instance<P.Witherable<Option.HKT>>({
  compactF: Option.compactF
})
