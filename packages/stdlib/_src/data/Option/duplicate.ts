/**
 * Wraps this option into a second one.
 *
 * @tsplus fluent Option duplicate
 * @tsplus static Option/Aspects duplicate
 */
export function duplicate<A>(ma: Option<A>): Option<Option<A>> {
  return ma.isNone() ? Option.none : Option.some(ma);
}
