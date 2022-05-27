/**
 * An associative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Either<A, B>>`.
 *
 * @tsplus type AssociativeEither
 */
export interface AssociativeEither<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly AssociativeEither: "AssociativeEither" }
  readonly orElseEither: <R, E, A, R2, E2, B>(
    fa: HKT.Kind<F, R, E, A>,
    fb: LazyArg<HKT.Kind<F, R2, E2, B>>
  ) => HKT.Kind<F, R2 & R, E2 | E, Either<A, B>>
}
