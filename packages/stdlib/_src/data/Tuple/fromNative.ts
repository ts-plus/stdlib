import type { Tuple } from "@tsplus/stdlib/data/Tuple/definition";
import { TupleInternal } from "@tsplus/stdlib/data/Tuple/definition";

/**
 * Converts from native tuple type.
 *
 * @tsplus static tsplus/TupleOps fromNative
 */
export function fromNative<Ks extends readonly unknown[]>(self: Ks): Tuple<Ks> {
  return new TupleInternal(self);
}
