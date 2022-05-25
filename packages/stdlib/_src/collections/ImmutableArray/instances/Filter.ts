import type * as P from "@tsplus/stdlib/prelude/Filter"

/**
 * @tsplus static ImmutableArray/Ops Filter
 */
export const Filter = HKT.instance<P.Filter<ImmutableArray.HKT>>({
  filter: ImmutableArray.$.filter
})
