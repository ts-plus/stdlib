import type * as P from "@tsplus/stdlib/prelude/Any";

/**
 * @tsplus static Either/Ops Any
 */
export const Any = HKT.instance<P.Any<Either.HKT>>({
  any: () => Either.right({})
});
