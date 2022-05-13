import type * as P from "@tsplus/stdlib/prelude/Covariant";

/**
 * @tsplus static Either/Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Either.HKT>>({
  map: Either.$.map
});
