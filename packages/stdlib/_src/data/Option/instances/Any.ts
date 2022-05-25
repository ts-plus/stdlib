import type * as P from "@tsplus/stdlib/prelude/Any"

/**
 * @tsplus static Option/Ops Any
 */
export const Any = HKT.instance<P.Any<Option.HKT>>({
  any: () => Option.some({})
})
