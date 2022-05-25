import type { CovariantComposition } from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus type Contravariant
 */
export interface Contravariant<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly Contravariant: "Contravariant"
  }
  readonly contramap: <A, B>(
    f: (b: B) => A
  ) => <R, E>(fa: HKT.Kind<F, R, E, A>) => HKT.Kind<F, R, E, B>
}

/**
 * @tsplus type Contravariant/Ops
 */
export interface ContravariantOps {}
export const Contravariant: ContravariantOps = {}

/**
 * @tsplus static Contravariant/Ops getComposition
 */
export function getContravariantComposition<F extends HKT, G extends HKT>(
  F: Contravariant<F>,
  G: Contravariant<G>
): CovariantComposition<F, G> {
  return HKT.instance({
    map: <A, B>(f: (a: A) => B): <FR, FE, GR, GE>(
      fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>
    ) => HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>> => F.contramap(G.contramap(f))
  })
}
