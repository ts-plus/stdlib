import type * as P from "@tsplus/stdlib/prelude/ReduceRight";

/**
 * @tsplus static ImmutableArray/Ops ReduceRight
 */
export const ReduceRight = HKT.instance<P.ReduceRight<ImmutableArray.HKT>>({
  reduceRight: (b, f) => (fa) => fa.array.reduceRight((b, a) => f(a, b), b)
});
