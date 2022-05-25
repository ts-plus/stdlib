import type * as P from "@tsplus/stdlib/prelude/FX/Run"

/**
 * @tsplus static Either/Ops Run
 */
export const Run = HKT.instance<P.Run<Either.HKT>>({
  either: Either.right
})
