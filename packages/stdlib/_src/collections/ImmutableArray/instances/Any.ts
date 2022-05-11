import type * as P from "@tsplus/stdlib/prelude/Any";

/**
 * @tsplus static ImmutableArray/Ops Any
 */
export const Any = HKT.instance<P.Any<ImmutableArray.HKT>>({
  any: () => ImmutableArray({})
});
