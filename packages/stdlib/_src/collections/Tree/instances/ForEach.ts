import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static Tree.Ops ForEach
 */
export const ForEach = HKT.instance<P.ForEach<Tree.HKT>>({
  ...Tree.Covariant,
  forEachF: Tree.forEachF
})
