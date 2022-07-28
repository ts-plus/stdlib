import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static Maybe.Ops ForEach
 */
export const ForEach = HKT.instance<P.ForEach<Maybe.HKT>>({
  ...Maybe.Covariant,
  forEachF: Maybe.forEachF
})
