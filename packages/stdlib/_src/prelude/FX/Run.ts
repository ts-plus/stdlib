/**
 * @tsplus type Run
 */
export interface Run<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Run: "Run";
  };
  readonly either: <A, R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, never, Either<E, A>>;
}
