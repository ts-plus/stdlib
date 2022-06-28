import type * as P from "@tsplus/stdlib/prelude/AssociativeFlatten"

/**
 * @tsplus static Eval/Ops AssociativeFlatten
 */
export const AssociativeFlatten = HKT.instance<P.AssociativeFlatten<Eval.HKT>>({
  flatten: (ffa) => ffa.flatMap(identity)
})
