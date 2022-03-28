/**
 * @tsplus fluent List head
 */
export function head<A>(self: List<A>): Option<A> {
  return self.isNil() ? Option.none : Option.some(self.head);
}
