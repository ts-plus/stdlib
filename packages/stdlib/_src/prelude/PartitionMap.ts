/**
 * @tsplus type PartitionMap
 */
export interface PartitionMap<F extends HKT> extends HKT.Typeclass<F> {
  readonly Law: {
    readonly PartitionMap: "PartitionMap"
  }
  readonly partitionMap: <A, B, B1>(
    f: (a: A) => Either<B, B1>
  ) => <R, E>(
    fa: HKT.Kind<F, R, E, A>
  ) => readonly [HKT.Kind<F, R, E, B>, HKT.Kind<F, R, E, B1>]
}
