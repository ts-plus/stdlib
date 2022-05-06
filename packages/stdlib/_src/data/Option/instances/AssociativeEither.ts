/**
 * @tsplus static Option/Ops AssociativeEither
 */
export const OptionAssociativeEither = HKT.instance<AssociativeEither<Option.HKT>>({
  orElseEither: <B>(fb: LazyArg<Option<B>>) =>
    <A>(fa: Option<A>): Option<Either<A, B>> =>
      fa._tag === "Some" ? Option.some(Either.left(fa.value)) : fb().map(Either.right)
});
