/**
 * @tsplus type Access
 */
export interface Access<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Access: "Access";
  };
  readonly access: <A, R>(f: (_: R) => A) => HKT.Kind<F, R, never, A>;
}
