/**
 * @tsplus static Either/Ops Covariant
 */
export const EitherCovariant = HKT.instance<Covariant<Either.HKT>>({
  map: Either.$.map
});
