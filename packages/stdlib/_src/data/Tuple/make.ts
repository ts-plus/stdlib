/**
 * Creates a new `Tuple`.
 *
 * @tsplus static tsplus/TupleOps __call
 * @tsplus static tsplus/TupleOps make
 */
export function make<Ks extends unknown[]>(...args: Ks): Tuple<Ks> {
  return new Tuple(args);
}
