/**
 * @tsplus static Either/Ops AssociativeBoth
 */
export const EitherAssociativeBoth = HKT.instance<AssociativeBoth<Either.HKT>>({
  both: Either.$.zip
});
