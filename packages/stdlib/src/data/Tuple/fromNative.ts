import type { Tuple } from "./definition.js"
import { TupleInternal } from "./definition.js"

/**
 * Converts from native tuple type.
 *
 * @tsplus static tsplus/TupleOps fromNative
 */
export function fromNative<Ks extends readonly unknown[]>(self: Ks): Tuple<Ks> {
  return new TupleInternal(self)
}
