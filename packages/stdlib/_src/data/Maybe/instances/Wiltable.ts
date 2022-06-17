import type * as P from "@tsplus/stdlib/prelude/Wiltable"

/**
 * @tsplus static Maybe/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Wiltable<Maybe.HKT>>({
  separateF: Maybe.separateF
})
