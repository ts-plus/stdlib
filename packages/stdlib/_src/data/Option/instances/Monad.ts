/**
 * @tsplus static Option/Ops Monad
 */
export const OptionMonad = HKT.instance<Monad<Option.HKT>>({
  ...Option.Covariant,
  ...Option.IdentityFlatten
});
