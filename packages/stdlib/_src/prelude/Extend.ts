/**
 * @tsplus type Extend
 */
export interface Extend<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Extend: "Extend" }
  readonly extend: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (fa: HKT.Kind<F, R, E, A>) => B
  ) => HKT.Kind<F, R, E, B>
}
