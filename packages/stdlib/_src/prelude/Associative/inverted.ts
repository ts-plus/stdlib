/**
 * The dual of a `Associative`, obtained by swapping the arguments of `combine`.
 *
 * @tsplus getter Associative inverted
 */
export function inverted<A>(self: Associative<A>): Associative<A> {
  return Associative((x, y) => self.combine(y, x))
}
