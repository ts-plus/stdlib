/**
 * @tsplus type PartitionMap
 */
export interface PartitionMap<F extends HKT> extends HKT.TypeClass<F> {
  readonly Law: { readonly PartitionMap: "PartitionMap" }
  readonly partitionMap: <R, E, A, B, B1>(
    fa: HKT.Kind<F, R, E, A>,
    f: (a: A) => Either<B, B1>
  ) => Tuple<[HKT.Kind<F, R, E, B>, HKT.Kind<F, R, E, B1>]>
}
