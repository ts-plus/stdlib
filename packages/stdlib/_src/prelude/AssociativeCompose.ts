/**
 * @tsplus type AssociativeCompose
 */
export interface AssociativeCompose<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly AssociativeCompose: "AssociativeCompose"
  }
  readonly compose: <B, C, E2 = never>(
    bc: HKT.Kind<F, B, E2, C>
  ) => <A, E = never>(ab: HKT.Kind<F, A, E, B>) => HKT.Kind<F, A, E | E2, C>
}
