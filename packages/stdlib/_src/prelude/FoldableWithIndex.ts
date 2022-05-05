/**
 * @tsplus type FoldableWithIndex
 */
export type FoldableWithIndex<K, F extends HKT> =
  & ReduceRightWithIndex<K, F>
  & ReduceWithIndex<K, F>
  & FoldMapWithIndex<K, F>;
