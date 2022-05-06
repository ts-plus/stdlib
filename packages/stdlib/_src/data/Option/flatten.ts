/**
 * Flattens nested options.
 *
 * @tsplus fluent Option flatten
 * @tsplus static Option/Aspects flatten
 */
export function flatten<A>(fa: Option<Option<A>>): Option<A> {
  return fa.flatMap(identity);
}
