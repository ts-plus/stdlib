/**
 * @tsplus type Wiltable
 */
export interface Wiltable<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Wiltable: "Wiltable"
  }
  readonly separateF: Wilt<F>
}

/**
 * @tsplus type Wilt
 */
export interface Wilt<F extends HKT> {
  readonly Law: {
    readonly Wilt: "Wilt"
  }
  <G extends HKT>(F: Applicative<G>): <GR, GE, A, B, B2>(
    f: (a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>
  ) => <FR, FE>(
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, GR, GE, readonly [HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>
}

/**
 * @tsplus type Wiltable/Ops
 */
export interface WiltableOps {}
export const Wiltable: WiltableOps = {}

/**
 * @tsplus static Wiltable/Ops implementSeparateF
 */
export function implementSeparateF<F extends HKT>(): (
  i: <FR, FE, A, B, B2, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) => (
    G: Applicative<G>
  ) => (
    f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>
  ) => (
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, FR, FE, readonly [HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>
) => Wilt<F>
export function implementSeparateF() {
  return (i: any) => i()
}
