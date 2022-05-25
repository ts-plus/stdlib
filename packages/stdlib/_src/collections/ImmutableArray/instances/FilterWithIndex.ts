import type * as P from "@tsplus/stdlib/prelude/FilterWithIndex"

/**
 * @tsplus static ImmutableArray/Ops FilterWithIndex
 */
export const FilterWithIndex = HKT.instance<P.FilterWithIndex<number, ImmutableArray.HKT>>({
  filterWithIndex: ImmutableArray.$.filterWithIndex
})
