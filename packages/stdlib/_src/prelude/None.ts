/**
 * @tsplus type None
 */
export interface None<F extends HKT> extends HKT.TypeClass<F> {
  readonly never: HKT.Kind<F, unknown, never, never>
}
