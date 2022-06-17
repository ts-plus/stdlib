/**
 * Transforms an exception into an `Maybe`. If `f` throws, returns `None`,
 * otherwise returns the output wrapped in `Some`.
 *
 * @tsplus static Maybe/Ops tryCatch
 */
export function tryCatch<A>(f: LazyArg<A>): Maybe<A> {
  try {
    return Maybe.some(f())
  } catch (e) {
    return Maybe.none
  }
}
