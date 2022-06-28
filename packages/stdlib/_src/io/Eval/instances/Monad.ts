import type * as P from "@tsplus/stdlib/prelude/Monad"

/**
 * @tsplus static Eval/Ops Monad
 */
export const Monad = HKT.instance<P.Monad<Eval.HKT>>({
  ...Eval.Any,
  ...Eval.AssociativeFlatten,
  ...Eval.Covariant
})
