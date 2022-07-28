import type * as P from "@tsplus/stdlib/prelude/Witherable"

/**
 * @tsplus static Maybe.Ops Witherable
 */
export const Witherable = HKT.instance<P.Witherable<Maybe.HKT>>({
  compactF: Maybe.compactF
})
