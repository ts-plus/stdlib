/**
 * Zips `Maybe<A>` and `Maybe<B>` into `Maybe<Tuple<[A, B]>>`.
 *
 * @tsplus operator Maybe +
 * @tsplus fluent Maybe zip
 */
export function zip_<A, B>(fa: Maybe<A>, fb: Maybe<B>): Maybe<Tuple<[A, B]>> {
  return fa.flatMap((a) => fb.map((b) => Tuple(a, b)))
}

/**
 * @tsplus static Maybe/Aspects zip
 */
export const zip = Pipeable(zip_)
