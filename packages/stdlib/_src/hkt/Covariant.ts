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
  F_: Covariant<F>,
  G_: Covariant<G>
): CovariantComposition<F, G> {
  return HKT.instance<CovariantComposition<F, G>>({
    map: (f) => (fa) => F_.map(G_.map(f) as any)(fa) as any
  });
}
