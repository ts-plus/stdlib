import { Succeed } from "@tsplus/stdlib/io/Eval/definition"

/**
 * Constructs a computation that always succeeds with the specified value.
 *
 * @tsplus static Eval.Ops succeedNow
 */
export function succeedNow<A>(a: A): Eval<A> {
  return new Succeed(() => a)
}
