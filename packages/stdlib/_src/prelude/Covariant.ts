/**
 * @tsplus type Covariant
 */
export interface Covariant<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Covariant: "Covariant" }
  readonly map: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (a: A) => B
  ) => HKT.Kind<F, R, E, B>
}

/**
 * @tsplus type Covariant/Ops
 */
export interface CovariantOps {}
export const Covariant: CovariantOps = {}

export interface CovariantComposition<F extends HKT, G extends HKT> {
  readonly Law: { readonly Covariant: "Covariant" }
  readonly map: <FR, FE, GR, GE, A, B>(
    fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>,
    f: (a: A) => B
  ) => HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>>
}

/**
 * @tsplus static Covariant/Ops getComposition
 */
export function getCovariantComposition<F extends HKT, G extends HKT>(
  F: Covariant<F>,
  G: Covariant<G>
): CovariantComposition<F, G> {
  return HKT.instance({
    map: (fa, f) => F.map(fa, (ga) => G.map(ga, f))
  })
}
