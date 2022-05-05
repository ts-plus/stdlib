/**
 * @tsplus static Either/Ops ReduceRight
 */
export const EitherReduceRight = HKT.instance<ReduceRight<Either.HKT>>({
  reduceRight: Either.$.reduceRight
});
