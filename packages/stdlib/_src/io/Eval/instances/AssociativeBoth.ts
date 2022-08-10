import type * as P from "@tsplus/stdlib/prelude/AssociativeBoth"

/**
 * @tsplus static Eval.Ops AssociativeBoth
 */
export const AssociativeBoth = HKT.instance<P.AssociativeBoth<Eval.HKT>>({
  both: (that) => Eval.$.zip(that)
})
