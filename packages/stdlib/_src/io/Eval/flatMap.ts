import type { EvalInternal } from "@tsplus/stdlib/io/Eval"
import { FlatMap } from "@tsplus/stdlib/io/Eval/definition"

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Eval.Aspects flatMap
 * @tsplus pipeable Eval flatMap
 */
export function flatMap<A, B>(f: (a: A) => Eval<B>) {
  return (self: Eval<A>): Eval<B> => new FlatMap(self as EvalInternal<A>, f as (a: A) => EvalInternal<B>)
}
