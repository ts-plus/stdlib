/**
 * @tsplus type FilterableWithIndex
 */
export type FilterableWithIndex<K, F extends HKT> =
  & FilterWithIndex<K, F>
  & PartitionWithIndex<K, F>
  & FilterMapWithIndex<K, F>
  & PartitionMapWithIndex<K, F>
