/**
 * @tsplus type PartitionWithIndex
 */
export interface PartitionWithIndex<K, F extends HKT> {
  readonly Law: { readonly PartitionWithIndex: "PartitionWithIndex" }
  readonly partitionWithIndex: PartitionWithIndex.Fn<K, F>
}

export declare namespace PartitionWithIndex {
  export interface Fn<K, F extends HKT> {
    <R, E, N extends string, A, B extends A>(
      fa: HKT.Kind<F, R, E, A>,
      refinement: RefinementWithIndex<K, A, B>
    ): Tuple<[HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, B>]>
    <R, E, A>(
      fa: HKT.Kind<F, R, E, A>,
      predicate: PredicateWithIndex<K, A>
    ): Tuple<[HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, A>]>
  }
}
