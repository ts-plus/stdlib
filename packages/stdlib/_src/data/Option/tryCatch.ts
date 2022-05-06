/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`,
 * otherwise returns the output wrapped in `Some`.
 *
 * @tsplus static Option/Ops tryCatch
 */
export function tryCatch<A>(f: LazyArg<A>): Option<A> {
  try {
    return Option.some(f());
  } catch (e) {
    return Option.none;
  }
}
