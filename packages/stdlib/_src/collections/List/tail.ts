/**
 * @tsplus getter List tail
 */
export function tail<A>(self: List<A>): Option<List<A>> {
  return self.isNil() ? Option.none : Option.some(self.tail)
}
