import type * as P from "@tsplus/stdlib/prelude/IdentityBoth"

/**
 * @tsplus static Eval/Ops IdentityBoth
 */
export const IdentityBoth = HKT.instance<P.IdentityBoth<Eval.HKT>>({
  ...Eval.AssociativeBoth,
  ...Eval.Any
})
