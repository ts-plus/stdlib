import type * as P from "@tsplus/stdlib/prelude/Extend";

/**
 * @tsplus static ImmutableArray/Ops extend
 */
export const Extend = HKT.instance<P.Extend<ImmutableArray.HKT>>({
  extend: ImmutableArray.$.extend
});
