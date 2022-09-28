/**
 * @tsplus type PartitionWithIndex
 */
export interface PartitionWithIndex<K, F extends HKT> {
  readonly Law: {
    readonly PartitionWithIndex: "PartitionWithIndex"
  }
  readonly partitionWithIndex: PartitionWithIndex.Fn<K, F>
}

export declare namespace PartitionWithIndex {
  export interface Fn<K, F extends HKT> {
    <N extends string, A, B extends A>(refinement: RefinementWithIndex<K, A, B>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => readonly [HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, B>]
    <A>(predicate: PredicateWithIndex<K, A>): <R, E>(
      fa: HKT.Kind<F, R, E, A>
    ) => readonly [HKT.Kind<F, R, E, A>, HKT.Kind<F, R, E, A>]
  }
}
