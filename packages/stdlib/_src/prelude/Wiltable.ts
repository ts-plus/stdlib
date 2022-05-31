/**
 * @tsplus type Wiltable
 */
export interface Wiltable<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Wiltable: "Wilt" }
  readonly wilt: WiltFn<F>
}

export interface WiltFn<F extends HKT> {
  <G extends HKT, FR, FE, GR, GE, A, B, B2>(
    ta: HKT.Kind<F, FR, FE, A>,
    f: (a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>,
    F: Applicative<G>
  ): HKT.Kind<G, GR, GE, Tuple<[HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>>
}

/**
 * @tsplus type Wiltable/Ops
 */
export interface WiltableOps {}
export const Wiltable: WiltableOps = {}
