/**
 * @tsplus type Witherable
 */
export interface Witherable<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Witherable: "Witherable"
  }
  readonly compactF: Wither<F>
}

/**
 * @tsplus type Wither
 */
export interface Wither<F extends HKT> {
  readonly Law: {
    readonly Wither: "Wither"
  }
  <G extends HKT>(F: Applicative<G>): <GR, GE, A, B>(
    f: (a: A) => HKT.Kind<G, GR, GE, Option<B>>
  ) => <FR, FE>(
    ta: HKT.Kind<F, FR, FE, A>
  ) => HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>
}

/**
 * @tsplus type Witherable/Ops
 */
export interface WitherableOps {}
export const Witherable: WitherableOps = {}

/**
 * @tsplus static Witherable/Ops implementCompactF
 */
export function implementCompactF<F extends HKT>(): (
  i: <FR, FE, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) => (
    G: Applicative<G>
  ) => (
    f: (a: A) => HKT.Kind<G, FR, FE, Option<B>>
  ) => (ta: HKT.Kind<F, FR, FE, A>) => HKT.Kind<G, FR, FE, HKT.Kind<F, FR, FE, B>>
) => Wither<F>
export function implementCompactF() {
  return (i: any) => i()
}
