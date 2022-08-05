/**
 * Filters out `None` values from a `HashMap` of `Maybe`s.
 *
 * @tsplus getter HashMap compact
 */
export function compact<K, A>(self: HashMap<K, Maybe<A>>): HashMap<K, A> {
  return self.collectWithIndex((_, a) => a)
}
