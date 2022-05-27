import type * as P from "@tsplus/stdlib/prelude/Separable"

/**
 * @tsplus static ImmutableArray/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Separable<ImmutableArray.HKT>>({
  separate: ImmutableArray.separateF
})
