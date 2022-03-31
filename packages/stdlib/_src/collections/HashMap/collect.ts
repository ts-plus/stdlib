/**
 * Maps over the values of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus fluent HashMap collect
 */
export function collect_<K, A, B>(
  self: HashMap<K, A>,
  f: (a: A) => Option<B>
): HashMap<K, B> {
  return self.collectWithIndex((_, a) => f(a));
}

/**
 * Maps over the values of the `HashMap` using the specified partial function
 * and filters out `None` values.
 *
 * @tsplus static HashMap/Aspects collect
 */
export const collect = Pipeable(collect_);
