/**
 * Classic applicative.
 *
 * @tsplus fluent Option ap
 */
export function ap_<A, B>(fab: Option<(a: A) => B>, fa: Option<A>): Option<B> {
  return fab.isNone() ?
    Option.none :
    fa.isNone() ?
    Option.none :
    Option.some(fab.value(fa.value));
}

/**
 * @tsplus static Option/Aspects ap
 */
export const ap = Pipeable(ap_);
