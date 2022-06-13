/**
 * @tsplus getter List toSet
 */
export function toSet<A>(self: List<A>): Set<A> {
  return new Set(self)
}
