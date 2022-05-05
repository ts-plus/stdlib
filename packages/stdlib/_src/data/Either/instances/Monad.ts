/**
 * @tsplus static Either/Ops Monad
 */
export const EitherMonad = HKT.instance<Monad<Either.HKT>>({
  ...Either.Any,
  ...Either.Covariant,
  ...Either.AssociativeFlatten
});
