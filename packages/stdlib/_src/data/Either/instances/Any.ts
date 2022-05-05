/**
 * @tsplus static Either/Ops Any
 */
export const EitherAny = HKT.instance<Any<Either.HKT>>({
  any: () => Either.right({})
});
