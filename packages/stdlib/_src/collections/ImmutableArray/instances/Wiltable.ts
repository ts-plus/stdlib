import type * as P from "@tsplus/stdlib/prelude/Wiltable"

/**
 * @tsplus static ImmutableArray.Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Wiltable<ImmutableArray.HKT>>({
  separateF: ImmutableArray.separateF
})
