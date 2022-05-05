/**
 * @tsplus static Either/Ops Applicative
 */
export const EitherApplicative = HKT.instance<Applicative<Either.HKT>>({
  ...Either.Any,
  ...Either.Covariant,
  ...Either.AssociativeBoth
});
