/**
 * @tsplus static Either/Ops AssociativeEither
 */
export const EitherAssociativeEither = HKT.instance<AssociativeEither<Either.HKT>>({
  orElseEither: (fb) => (fa) => fa._tag === "Right" ? Either.right(Either.left(fa.right)) : fb().map(Either.right)
});
