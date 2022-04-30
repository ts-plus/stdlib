/**
 * A binary operator that combines two values of types `F<A>` and `F<B>` to
 * produce an `F<Tuple<[A, B]>>` with an identity.
 */
export type IdentityBoth<F extends HKT> = AssociativeBoth<F> & Any<F>;
