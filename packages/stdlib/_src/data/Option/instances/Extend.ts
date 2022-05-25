import type * as P from "@tsplus/stdlib/prelude/Extend"

/**
 * @tsplus static Option/Ops Extend
 */
export const Extend = HKT.instance<P.Extend<Option.HKT>>({
  extend: Option.$.extend
})
