/**
 * An commutative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Tuple<[A, B]>>`.
 *
 * @tsplus type CommutativeBoth
 */
export interface CommutativeBoth<F extends HKT> extends AssociativeBoth<F> {
  readonly Law: AssociativeBoth<F>["Law"] & { readonly CommutativeBoth: "CommutativeBoth" }
}
