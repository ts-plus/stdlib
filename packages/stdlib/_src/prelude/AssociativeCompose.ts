/**
 * @tsplus type AssociativeCompose
 */
export interface AssociativeCompose<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly AssociativeCompose: "AssociativeCompose" }
  readonly compose: <B, C, E2, A, E>(
    ab: HKT.Kind<F, A, E, B>,
    bc: HKT.Kind<F, B, E2, C>
  ) => HKT.Kind<F, A, E | E2, C>
}
