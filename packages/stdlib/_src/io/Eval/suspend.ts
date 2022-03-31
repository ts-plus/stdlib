import { Suspend } from "@tsplus/stdlib/io/Eval/definition";

/**
 * Suspend a computation, useful in recursion.
 *
 * @tsplus static Eval/Ops suspend
 */
export function suspend<A>(f: LazyArg<Eval<A>>): Eval<A> {
  return new Suspend(f);
}
