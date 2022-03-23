import type { Tuple } from "@tsplus/stdlib/data/Tuple/definition";
import { TupleInternal } from "@tsplus/stdlib/data/Tuple/definition";

/**
 * Creates a new `Tuple`.
 *
 * @tsplus static tsplus/TupleOps __call
 * @tsplus static tsplus/TupleOps make
 */
export function make<Ks extends unknown[]>(...args: Ks): Tuple<Ks> {
  return new TupleInternal(args);
}
