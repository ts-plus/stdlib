import type * as P from "@tsplus/stdlib/prelude/Filterable"

/**
 * @tsplus static Option/Ops Filterable
 */
export const Filterable = HKT.instance<P.Filterable<Option.HKT>>({
  filter: Option.$.filter,
  filterMap: Option.$.filterMap,
  partition: Option.$.partition,
  partitionMap: Option.$.partitionMap
})
