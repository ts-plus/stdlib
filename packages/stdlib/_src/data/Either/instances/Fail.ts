/**
 * @tsplus static Either/Ops Fail
 */
export const EitherFail = HKT.instance<Fail<Either.HKT>>({
  fail: Either.left
});
