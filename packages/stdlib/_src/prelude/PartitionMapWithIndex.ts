/**
 * @tsplus type PartitionMapWithIndex
 */
export interface PartitionMapWithIndex<K, F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly PartitionMapWithIndex: "PartitionMapWithIndex" }
  readonly partitionMapWithIndex: <R, E, A, B, B1>(
    fa: HKT.Kind<F, R, E, A>,
    f: (k: K, a: A) => Either<B, B1>
  ) => Tuple<[HKT.Kind<F, R, E, B>, HKT.Kind<F, R, E, B1>]>
}
