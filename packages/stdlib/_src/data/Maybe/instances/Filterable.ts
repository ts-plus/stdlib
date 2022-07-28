import type * as P from "@tsplus/stdlib/prelude/Filterable"

/**
 * @tsplus static Maybe.Ops Filterable
 */
export const Filterable = HKT.instance<P.Filterable<Maybe.HKT>>({
  filter: Maybe.$.filter,
  filterMap: Maybe.$.filterMap,
  partition: Maybe.$.partition,
  partitionMap: Maybe.$.partitionMap
})
