/**
 * @tsplus type Separate
 */
export interface Separate<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Separate: "Separate"
  }
  readonly separate: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, Either<A, B>>
  ) => readonly [HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, B>]
}
