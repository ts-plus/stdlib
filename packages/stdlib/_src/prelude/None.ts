/**
 * @tsplus type None
 */
export interface None<F extends HKT> extends Typeclass<F> {
  readonly never: <R = unknown, E = never>() => Kind<F, R, E, never>;
}
