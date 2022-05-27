/**
 * @tsplus type Category
 */
export interface Category<F extends HKT> extends AssociativeCompose<F> {
  readonly Law: AssociativeCompose<F>["Law"] & { readonly Category: "Category" }
  readonly id: <A>() => HKT.Kind<F, A, never, A>
}
