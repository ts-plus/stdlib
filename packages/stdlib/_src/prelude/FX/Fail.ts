/**
 * @tsplus type Fail
 */
export interface Fail<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Fail: "Fail"
  }
  readonly fail: <E = never>(e: E) => HKT.Kind<F, unknown, E, never>
}
