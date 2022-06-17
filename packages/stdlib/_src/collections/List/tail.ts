/**
 * @tsplus getter List tail
 */
export function tail<A>(self: List<A>): Maybe<List<A>> {
  return self.isNil() ? Maybe.none : Maybe.some(self.tail)
}
