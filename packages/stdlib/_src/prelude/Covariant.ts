/**
 * @tsplus type Covariant
 */
export interface Covariant<F extends HKT> extends Typeclass<F> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <R, E>(fa: Kind<F, R, E, A>) => Kind<F, R, E, B>;
}

/**
 * @tsplus type Covariant/Ops
 */
export interface CovariantOps {}
export const Covariant: CovariantOps = {};

export interface CovariantComposition<F extends HKT, G extends HKT> {
  readonly map: <A, B>(
    f: (a: A) => B
  ) => <FR, FE, GR, GE>(
    fa: Kind<F, FR, FE, Kind<G, GR, GE, A>>
  ) => Kind<F, FR, FE, Kind<G, GR, GE, B>>;
}

/**
 * @tsplus static Covariant/Ops getComposition
 */
export function getCovariantComposition<F extends HKT, G extends HKT>(
  F: Covariant<F>,
  G: Covariant<G>
) {
  return HKT.instance({
    map: <A, B>(f: (a: A) => B): <FR, FE, GR, GE>(
      fa: Kind<F, FR, FE, Kind<G, GR, GE, A>>
    ) => Kind<F, FR, FE, Kind<G, GR, GE, B>> => F.map(G.map(f))
  });
}
