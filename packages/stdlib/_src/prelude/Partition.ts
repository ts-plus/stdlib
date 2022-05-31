/**
 * @tsplus type Partition
 */
export interface Partition<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly Partition: "Partition" }
  readonly partition: {
    <R, E, A, B extends A>(
      fa: HKT.Kind<F, R, E, A>,
      refinement: Refinement<A, B>
    ): Tuple<[HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, B>]>
    <R, E, A>(
      fa: HKT.Kind<F, R, E, A>,
      predicate: Predicate<A>
    ): Tuple<[HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, A>]>
  }
}
