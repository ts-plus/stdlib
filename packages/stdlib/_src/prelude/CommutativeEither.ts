/**
 * A commutative binary operator that combines two values of types `F<A>` and
 * `F<B>` to produce an `F<Either<A, B>>`.
 *
 * @tsplus type CommutativeEither
 */
export type CommutativeEither<F extends HKT> = {
  readonly Law: {
    readonly CommutativeEither: "CommutativeEither";
  };
} & AssociativeEither<F>;
