/**
 * @tsplus getter List head
 */
export function head<A>(self: List<A>): Maybe<A> {
  return self.isNil() ? Maybe.none : Maybe.some(self.head)
}
