/**
 * Converts from native tuple type.
 *
 * @tsplus static Tuple.Ops fromNative
 */
export function fromNative<Ks extends readonly unknown[]>(self: Ks): Tuple<Ks> {
  return new Tuple(self)
}
