import type * as P from "@tsplus/stdlib/prelude/Witherable";

/**
 * @tsplus static ImmutableArray/Ops Witherable
 */
export const Witherable = HKT.instance<P.Witherable<ImmutableArray.HKT>>({
  compactF: ImmutableArray.compactF
});
