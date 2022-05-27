import type { CovariantComposition } from "@tsplus/stdlib/prelude/Covariant"

/**
 * @tsplus type ForEach
 */
export interface ForEach<F extends HKT> extends Covariant<F> {
  readonly Law: Covariant<F>["Law"] & { readonly ForEach: "ForEach" }
  readonly forEach: ForEach.Fn<F>
}

/**
 * @tsplus type ForEach/Ops
 */
export interface ForEachOps {}
export const ForEach: ForEachOps = {}

/**
 * @tsplus type ForEachComposition
 */
export interface ForEachComposition<F extends HKT, G extends HKT> extends CovariantComposition<F, G> {
  readonly Law: CovariantComposition<F, G>["Law"] & { readonly ForEach: "ForEach" }
  readonly forEach: ForEach.CompositionFn<F, G>
}

export declare namespace ForEach {
  export interface Fn<F extends HKT> {
    <G extends HKT, FR, FE, GR, GE, A, B>(
      fa: HKT.Kind<F, FR, FE, A>,
      f: (a: A) => HKT.Kind<G, GR, GE, B>,
      /** @tsplus auto */ G: IdentityBoth<G> & Covariant<G>
    ): HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>
  }

  export interface CompositionFn<F extends HKT, G extends HKT> {
    <H extends HKT, FR, FE, GR, GE, HR, HE, A, B>(
      fa: HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, A>>,
      f: (a: A) => HKT.Kind<H, HR, HE, B>,
      /** @tsplus auto */ H: IdentityBoth<H> & Covariant<H>
    ): HKT.Kind<H, HR, HE, HKT.Kind<F, FR, FE, HKT.Kind<G, GR, GE, B>>>
  }
}

/**
 * @tsplus static ForEach/Ops getComposition
 */
export function getComposition<F extends HKT, G extends HKT>(
  F: ForEach<F>,
  G: ForEach<G>
): ForEachComposition<F, G> {
  return HKT.instance<ForEachComposition<F, G>>({
    ...Covariant.getComposition(F, G),
    forEach: (fa, f, H) => F.forEach(fa, (ga) => G.forEach(ga, f))
  })
}

/**
 * @tsplus static ForEach/Ops sequence
 */
export function sequence<T extends HKT, F extends HKT, R, E, FR, FE, A>(
  fa: HKT.Kind<T, R, E, HKT.Kind<F, FR, FE, A>>,
  T: ForEach<T>,
  F: Covariant<F> & IdentityBoth<F>
): HKT.Kind<F, FR, FE, HKT.Kind<T, R, E, A>> {
  return T.forEach(fa, identity)
}
