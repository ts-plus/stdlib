/**
 * Classic applicative.
 *
 * @tsplus fluent Maybe ap
 */
export function ap_<A, B>(fab: Maybe<(a: A) => B>, fa: Maybe<A>): Maybe<B> {
  return fab.isNone() ?
    Maybe.none :
    fa.isNone() ?
    Maybe.none :
    Maybe.some(fab.value(fa.value))
}

/**
 * @tsplus static Maybe/Aspects ap
 */
export const ap = Pipeable(ap_)
