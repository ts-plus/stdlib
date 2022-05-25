/**
 * `Associative` that returns the last max of elements.
 *
 * @tsplus static Associative/Ops max
 */
export function max<A>(O: Ord<A>): Associative<A> {
  return Associative(O.max)
}
