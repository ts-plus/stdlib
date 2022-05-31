/**
 * @tsplus type Invariant
 */
export interface Invariant<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Invariant: "Invariant" }
  readonly invmap: <A, B>(fg: {
    f: (a: A) => B
    g: (b: B) => A
  }) => {
    f: <R, E>(ma: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
    g: <R, E>(ma: HKT.Kind<F, R, E, B>) => HKT.Kind<F, R, E, A>
  }
}
