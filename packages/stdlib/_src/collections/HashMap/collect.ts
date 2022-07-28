/**
 * Maps over the values of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus static HashMap.Aspects collect
 * @tsplus pipeable HashMap collect
 */
export function collect<A, B>(f: (a: A) => Maybe<B>) {
  return <K>(self: HashMap<K, A>): HashMap<K, B> => self.collectWithIndex((_, a) => f(a))
}
