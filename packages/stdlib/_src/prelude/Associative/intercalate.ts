/**
 * Intercalate the specified value between elements when combining.
 *
 * @tsplus fluent Associative intercalate
 */
export function intercalate<A>(self: Associative<A>, value: A): Associative<A> {
  return Associative((x, y) => self.combine(x, self.combine(value, y)))
}
