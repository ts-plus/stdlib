import type * as P from "@tsplus/stdlib/prelude/FoldMapWithIndex";

/**
 * @tsplus static ImmutableArray/Ops FoldMapWithIndex
 */
export const FoldMapWithIndex = HKT.instance<P.FoldMapWithIndex<number, ImmutableArray.HKT>>({
  foldMapWithIndex: (M) => (f) => (fa) => fa.foldMapWithIndex(M, (a, i) => f(i, a))
});
