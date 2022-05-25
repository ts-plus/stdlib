import type * as P from "@tsplus/stdlib/prelude/WiltableWithIndex"

/**
 * @tsplus static ImmutableArray/Ops WiltableWithIndex
 */
export const WiltableWithIndex = HKT.instance<P.WiltableWithIndex<number, ImmutableArray.HKT>>({
  separateWithIndexF: ImmutableArray.separateWithIndexF
})
