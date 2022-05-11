import type * as P from "@tsplus/stdlib/prelude/Separate";

/**
 * @tsplus static ImmutableArray/Ops separate
 */
export const Separate = HKT.instance<P.Separate<ImmutableArray.HKT>>({
  separate: (fa) => fa.separate()
});
