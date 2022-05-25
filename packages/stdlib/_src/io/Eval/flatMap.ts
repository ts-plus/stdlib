import type { EvalInternal } from "@tsplus/stdlib/io/Eval"
import { FlatMap } from "@tsplus/stdlib/io/Eval/definition"

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus fluent Eval flatMap
 */
export function flatMap_<A, B>(self: Eval<A>, f: (a: A) => Eval<B>): Eval<B> {
  return new FlatMap(self as EvalInternal<A>, f as (a: A) => EvalInternal<B>)
}

/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @tsplus static Eval/Aspects flatMap
 */
export const flatMap = Pipeable(flatMap_)
