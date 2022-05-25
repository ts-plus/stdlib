/**
 * An `Associative` that always returns the first element.
 *
 * @tsplus static Associative/Ops first
 */
export function first<A>(): Associative<A> {
  return Associative((x, _) => x)
}
