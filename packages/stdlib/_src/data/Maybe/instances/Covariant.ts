import type * as P from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus static Maybe.Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Maybe.HKT>>({
  map: Maybe.$.map
})
