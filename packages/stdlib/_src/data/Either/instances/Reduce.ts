/**
 * @tsplus static Either/Ops Reduce
 */
export const EitherReduce = HKT.instance<Reduce<Either.HKT>>({
  reduce: Either.$.reduce
});
