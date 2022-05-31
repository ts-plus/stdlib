import type * as P from "@tsplus/stdlib/prelude/Separable"

/**
 * @tsplus static Option/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Separable<Option.HKT>>({
  separate: Option.separateF
})
