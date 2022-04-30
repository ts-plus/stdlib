/**
 * An associative binary operator that combines two values of types `F<A>`
 * and `F<B>` to produce an `F<Tuple<[A, B]>>`.
 *
 * @tsplus type AssociativeBoth
 */
export interface AssociativeBoth<F extends HKT> extends Typeclass<F> {
  readonly Law: {
    readonly AssociativeBoth: "AssociativeBoth";
  };
  both: <R2, E2, B>(
    fb: Kind<F, R2, E2, B>
  ) => <R, E, A>(
    fa: Kind<F, R, E, A>
  ) => Kind<F, R2 & R, E2 | E, Tuple<[A, B]>>;
}
