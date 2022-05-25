/**
 * @tsplus type None
 */
export interface None<F extends HKT> extends HKT.Typeclass<F> {
  readonly never: <R = unknown, E = never>() => HKT.Kind<F, R, E, never>
}
