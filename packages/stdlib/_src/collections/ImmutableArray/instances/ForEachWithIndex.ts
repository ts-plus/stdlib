import type * as P from "@tsplus/stdlib/prelude/ForEachWithIndex"

/**
 * @tsplus static ImmutableArray/Ops ForEachWithIndex
 */
export const ForEachWithIndex = HKT.instance<P.ForEachWithIndex<number, ImmutableArray.HKT>>({
  ...ImmutableArray.Covariant,
  forEachWithIndexF: ImmutableArray.forEachWithIndexF
})
