/**
 * `Associative` that returns last min of elements.
 *
 * @tsplus static Associative/Ops min
 */
export function min<A>(O: Ord<A>): Associative<A> {
  return Associative(O.min);
}
