/**
 * @tsplus type WiltableWithIndex
 */
export interface WiltableWithIndex<K, F extends HKT> {
  readonly Law: { readonly WiltableWithIndex: "SeparableWithIndex" }
  readonly separateWithIndex: WiltWithIndex<K, F>
}

/**
 * @tsplus type WiltableWithIndex/Ops
 */
export interface WiltableWithIndexOps {}
export const WiltableWithIndex: WiltableWithIndexOps = {}

export interface WiltWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  <G extends HKT, FR, FE, GR, GE, A, B, B2>(
    ta: HKT.Kind<F, FR, FE, A>,
    f: (k: K, a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>,
    F: Applicative<G>
  ): HKT.Kind<G, GR, GE, Tuple<[HKT.Kind<F, FR, FE, B>, HKT.Kind<F, FR, FE, B2>]>>
}
