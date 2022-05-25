import type * as P from "@tsplus/stdlib/prelude/FilterMap"

/**
 * @tsplus static ImmutableArray/Ops FilterMap
 */
export const FilterMap = HKT.instance<P.FilterMap<ImmutableArray.HKT>>({
  filterMap: ImmutableArray.$.collect
})
