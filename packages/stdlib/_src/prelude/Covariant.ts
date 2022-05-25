/**
 * @tsplus type Covariant
 */
export interface Covariant<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Covariant: "Covariant"
  }
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
}

/**
 * @tsplus type Covariant/Ops
 */
export interface CovariantOps {}
export const Covariant: CovariantOps = {}

export interface CovariantComposition<F extends HKT, G extends HKT> {
  readonly Law: { readonly Covariant: "Covariant" }
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <FR, FE, GR, GE>(
    fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>
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
    map: <A, B>(f: (a: A) => B): <FR, FE, GR, GE>(
      fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>
    ) => HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>> => F.map(G.map(f))
  })
}
