import type * as P from "@tsplus/stdlib/prelude/WitherableWithIndex"

/**
 * @tsplus static ImmutableArray/Ops WitherableWithIndex
 */
export const WitherableWithIndex = HKT.instance<P.WitherableWithIndex<number, ImmutableArray.HKT>>({
  witherWithIndex: ImmutableArray.compactWithIndexF
})
