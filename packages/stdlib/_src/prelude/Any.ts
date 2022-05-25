/**
 * @tsplus type Any
 */
export interface Any<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Any: "Any"
  }
  readonly any: <R = unknown, E = never>() => HKT.Kind<F, R, E, unknown>
}
