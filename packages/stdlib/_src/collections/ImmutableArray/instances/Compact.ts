import type * as P from "@tsplus/stdlib/prelude/Compact";

/**
 * @tsplus static ImmutableArray/Ops Compact
 */
export const Compact = HKT.instance<P.Compact<ImmutableArray.HKT>>({
  compact: (fa) => fa.compact()
});
