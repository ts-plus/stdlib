/**
 * A binary operator that combines two values of types `F<A>` and `F<B>` to
 * produce an `F<Either<A, B>>` with an identity value.
 *
 * @tsplus type IdentityEither
 */
export type IdentityEither<F extends HKT> = AssociativeEither<F> & None<F>;
