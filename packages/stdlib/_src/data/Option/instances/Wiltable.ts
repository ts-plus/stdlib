import type * as P from "@tsplus/stdlib/prelude/Wiltable";

/**
 * @tsplus static Option/Ops Wiltable
 */
export const Wiltable = HKT.instance<P.Wiltable<Option.HKT>>({
  separateF: Option.separateF
});
