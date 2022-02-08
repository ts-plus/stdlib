import type { Tuple } from "./definition.js"
import { TupleInternal } from "./definition.js"

/**
 * Creates a new `Tuple`.
 *
 * @tsplus static tsplus/TupleOps __call
 */
export function make<Ks extends unknown[]>(...args: Ks): Tuple<Ks> {
  return new TupleInternal(args)
}
