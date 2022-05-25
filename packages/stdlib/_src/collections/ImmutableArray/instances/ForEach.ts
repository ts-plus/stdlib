import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static ImmutableArray/Ops ForEach
 */
export const ForEachImmutableArray = HKT.instance<P.ForEach<ImmutableArray.HKT>>({
  ...ImmutableArray.Covariant,
  forEachF: ImmutableArray.forEachF
})
