/**
 * An associative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Tuple<[A, B]>>`.
 *
 * @tsplus type AssociativeBoth
 */
export interface AssociativeBoth<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly AssociativeBoth: "AssociativeBoth" }
  both: <R, E, A, R2, E2, B>(
    fa: HKT.Kind<F, R, E, A>,
    fb: HKT.Kind<F, R2, E2, B>
  ) => HKT.Kind<F, R2 & R, E2 | E, Tuple<[A, B]>>
}
