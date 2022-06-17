import type * as P from "@tsplus/stdlib/prelude/Any"

/**
 * @tsplus static Maybe/Ops Any
 */
export const Any = HKT.instance<P.Any<Maybe.HKT>>({
  any: () => Maybe.some({})
})
