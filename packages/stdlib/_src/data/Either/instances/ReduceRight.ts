import type * as P from "@tsplus/stdlib/prelude/ReduceRight";

/**
 * @tsplus static Either/Ops ReduceRight
 */
export const ReduceRight = HKT.instance<P.ReduceRight<Either.HKT>>({
  reduceRight: Either.$.reduceRight
});
