import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static Either/Ops ForEach
 */
export const ForEach = HKT.instance<P.ForEach<Either.HKT>>({
  ...Either.Covariant,
  forEach: Either.forEachF
})
