/**
 * An associative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Either<A, B>>`.
 *
 * @tsplus type AssociativeEither
 */
export interface AssociativeEither<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly AssociativeEither: "AssociativeEither";
  };
  readonly orElseEither: <R2, E2, B>(
    fb: LazyArg<HKT.Kind<F, R2, E2, B>>
  ) => <R, E, A>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R2 & R, E2 | E, Either<A, B>>;
}
