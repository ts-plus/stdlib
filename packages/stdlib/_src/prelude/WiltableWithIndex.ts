/**
 * @tsplus type WiltableWithIndex
 */
export interface WiltableWithIndex<K, F extends HKT> {
  readonly Law: {
    readonly WiltableWithIndex: "WiltableWithIndex"
  }
  readonly separateWithIndexF: WiltWithIndex<K, F>
}

/**
 * @tsplus type WiltableWithIndex/Ops
 */
export interface WiltableWithIndexOps {}
export const WiltableWithIndex: WiltableWithIndexOps = {}

export interface WiltWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  <G extends HKT>(F: Applicative<G>): <GR, GE, A, B, B2>(
    f: (k: K, a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>
  ) => <FR, FE>(
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, GR, GE, readonly [HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>
}

/**
 * @tsplus static WiltableWithIndex/Ops implementSeparateWithIndexF
 */
export function implementSeparateWithIndexF<K, F extends HKT>(): (
  i: <R, E, A, B, B2, G extends HKT>(_: {
    A: A
    B: B
    G: G
    R: R
    E: E
  }) => (
    G: Applicative<G>
  ) => (
    f: (k: K, a: A) => HKT.Kind<G, R, E, Either<B, B2>>
  ) => (
    ta: HKT.Kind<F, R, E, A>
  ) => HKT.Kind<G, R, E, readonly [HKT.Kind<F, R, E, B>, HKT.Kind<F, R, E, B2>]>
) => WiltWithIndex<K, F>
export function implementSeparateWithIndexF() {
  return (i: any) => i()
}
