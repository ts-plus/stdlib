/**
 * Zips `Maybe<A>` and `Maybe<B>` into `Maybe<C>` using the provided zipper.
 *
 * @tsplus fluent Maybe zipWith
 */
export function zipWith_<A, B, C>(fa: Maybe<A>, fb: Maybe<B>, zipper: (a: A, b: B) => C): Maybe<C> {
  return fa.flatMap((a) => fb.map((b) => zipper(a, b)))
}

/**
 * @tsplus static Maybe/Aspects zipWith
 */
export const zipWith = Pipeable(zipWith_)
