/**
 * @tsplus type Witherable
 */
export interface Witherable<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Witherable: "Witherable" }
  readonly wither: Wither<F>
}

/**
 * @tsplus type Wither
 */
export interface Wither<F extends HKT> {
  <G extends HKT, FR, FE, GR, GE, A, B>(
    ta: HKT.Kind<F, FR, FE, A>,
    f: (a: A) => HKT.Kind<G, GR, GE, Option<B>>,
    F: Applicative<G>
  ): HKT.Kind<G, GR, GE, HKT.Kind<F, FR, FE, B>>
}

/**
 * @tsplus type Witherable/Ops
 */
export interface WitherableOps {}
export const Witherable: WitherableOps = {}
