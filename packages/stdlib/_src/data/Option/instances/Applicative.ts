/**
 * @tsplus static Option/Ops Applicative
 */
export const OptionApplicative = HKT.instance<Applicative<Option.HKT>>({
  ...Option.Covariant,
  ...Option.IdentityBoth
});
