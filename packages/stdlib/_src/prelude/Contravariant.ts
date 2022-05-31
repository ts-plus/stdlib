import type { CovariantComposition } from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus type Contravariant
 */
export interface Contravariant<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Contravariant: "Contravariant" }
  readonly contramap: <R, E, A, B>(
    fa: HKT.Kind<F, R, E, A>,
    f: (b: B) => A
  ) => HKT.Kind<F, R, E, B>
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
    map: <FR, FE, GR, GE, A, B>(
      fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>,
      f: (a: A) => B
    ): HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>> => F.contramap(fa, (g: HKT.Kind<G, GR, GE, B>) => G.contramap(g, f))
  })
}
