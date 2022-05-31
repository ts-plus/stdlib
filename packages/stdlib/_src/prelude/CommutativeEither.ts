/**
 * A commutative binary operator that combines two values of types `F<A>` and
 * `F<B>` to produce an `F<Either<A, B>>`.
 *
 * @tsplus type CommutativeEither
 */
export interface CommutativeEither<F extends HKT> extends AssociativeEither<F> {
  readonly Law: AssociativeEither<F>["Law"] & { readonly CommutativeEither: "CommutativeEither" }
}
