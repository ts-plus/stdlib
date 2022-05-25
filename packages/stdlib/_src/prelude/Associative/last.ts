/**
 * An `Associative` that always returns the last element.
 *
 * @tsplus static Associative/Ops last
 */
export function last<A>(): Associative<A> {
  return Associative((_, y) => y)
}
