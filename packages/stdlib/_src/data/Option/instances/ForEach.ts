import type * as P from "@tsplus/stdlib/prelude/ForEach"

/**
 * @tsplus static Option/Ops ForEach
 */
export const ForEach = HKT.instance<P.ForEach<Option.HKT>>({
  ...Option.Covariant,
  forEach: Option.forEachF
})
