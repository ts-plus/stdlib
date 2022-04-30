/**
 * @tsplus type Any
 */
export interface Any<F extends HKT> extends Typeclass<F> {
  readonly Law: {
    readonly Any: "Any";
  };
  readonly any: <R = unknown, E = never>() => Kind<F, R, E, unknown>;
}
