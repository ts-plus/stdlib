/**
 * Creates a new `Tuple`.
 *
 * @tsplus static Tuple.Ops __call
 * @tsplus static Tuple.Ops make
 */
export function make<Ks extends unknown[]>(...args: Ks): Tuple<Ks> {
  return new Tuple(args)
}
