/**
 * @tsplus type Any
 */
export interface Any<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Any: "Any" }
  readonly any: HKT.Kind<F, unknown, never, unknown>
}
