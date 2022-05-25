import type * as P from "@tsplus/stdlib/prelude/Reduce"

/**
 * @tsplus static ImmutableArray/Ops Reduce
 */
export const Reduce = HKT.instance<P.Reduce<ImmutableArray.HKT>>({
  reduce: (b, f) => (fa) => fa.reduce(b, f)
})
