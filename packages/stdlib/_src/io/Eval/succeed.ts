import { Succeed } from "@tsplus/stdlib/io/Eval/definition"

/**
 * Lift a sync (non failable) computation.
 *
 * @tsplus static Eval.Ops __call
 * @tsplus static Eval.Ops succeed
 */
export function succeed<A>(a: LazyArg<A>): Eval<A> {
  return new Succeed(a)
}
