/**
 * @tsplus type Filterable
 */
export type Filterable<F extends HKT> =
  & Filter<F>
  & FilterMap<F>
  & Partition<F>
  & PartitionMap<F>;
