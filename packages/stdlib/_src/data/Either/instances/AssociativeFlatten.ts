/**
 * @tsplus static Either/Ops AssociativeFlatten
 */
export const EitherAssociativeFlatten = HKT.instance<AssociativeFlatten<Either.HKT>>({
  flatten: (ffa) => ffa.flatten()
});
