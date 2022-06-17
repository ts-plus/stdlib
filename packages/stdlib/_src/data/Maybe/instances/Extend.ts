import type * as P from "@tsplus/stdlib/prelude/Extend"

/**
 * @tsplus static Maybe/Ops Extend
 */
export const Extend = HKT.instance<P.Extend<Maybe.HKT>>({
  extend: Maybe.$.extend
})
