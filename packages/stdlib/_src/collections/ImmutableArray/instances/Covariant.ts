import type * as P from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus static ImmutableArray.Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<ImmutableArray.HKT>>({
  map: ImmutableArray.$.map
})
