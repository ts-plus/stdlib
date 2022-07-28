import type * as P from "@tsplus/stdlib/prelude/Apply"

/**
 * @tsplus static Eval.Ops Apply
 */
export const Apply = HKT.instance<P.Apply<Eval.HKT>>({
  ...Eval.AssociativeBoth,
  ...Eval.Covariant
})
