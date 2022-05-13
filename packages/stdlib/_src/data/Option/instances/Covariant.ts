import type * as P from "@tsplus/stdlib/prelude/Covariant";

/**
 * @tsplus static Option/Ops Covariant
 */
export const Covariant = HKT.instance<P.Covariant<Option.HKT>>({
  map: Option.$.map
});
