/**
 * @tsplus type PartitionMapWithIndex
 */
export interface PartitionMapWithIndex<K, F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly PartitionMapWithIndex: "PartitionMapWithIndex"
  }
  readonly partitionMapWithIndex: <N extends string, A, B, B1>(
    f: (k: K, a: A) => Either<B, B1>
  ) => <X, I, R, E>(
    fa: HKT.Kind<F, R, E, A>
  ) => readonly [HKT.Kind<F, R, E, B>, HKT.Kind<F, R, E, B1>]
}
