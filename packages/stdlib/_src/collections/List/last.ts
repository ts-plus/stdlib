/**
 * @tsplus getter List last
 */
export function last<A>(self: List<A>): Maybe<A> {
  return self.isNil() ? Maybe.none : Maybe.some(self.unsafeLast!)
}
