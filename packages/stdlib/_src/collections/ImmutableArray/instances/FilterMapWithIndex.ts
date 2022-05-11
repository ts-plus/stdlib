import type * as P from "@tsplus/stdlib/prelude/FilterMapWithIndex";

/**
 * @tsplus static ImmutableArray/Ops FilterMapWithIndex
 */
export const FilterMapWithIndex = HKT.instance<P.FilterMapWithIndex<number, ImmutableArray.HKT>>({
  filterMapWithIndex: ImmutableArray.$.collectWithIndex
});
