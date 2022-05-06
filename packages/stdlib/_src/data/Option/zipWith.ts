/**
 * Zips `Option<A>` and `Option<B>` into `Option<C>` using the provided zipper.
 *
 * @tsplus fluent Option zipWith
 */
export function zipWith_<A, B, C>(fa: Option<A>, fb: Option<B>, zipper: (a: A, b: B) => C): Option<C> {
  return fa.flatMap((a) => fb.map((b) => zipper(a, b)));
}

/**
 * @tsplus static Option/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_);
