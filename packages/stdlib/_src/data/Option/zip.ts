/**
 * Zips `Option<A>` and `Option<B>` into `Option<Tuple<[A, B]>>`.
 *
 * @tsplus operator Option +
 * @tsplus fluent Option zip
 */
export function zip_<A, B>(fa: Option<A>, fb: Option<B>): Option<Tuple<[A, B]>> {
  return fa.flatMap((a) => fb.map((b) => Tuple(a, b)));
}

/**
 * @tsplus static Option/Aspects zip
 */
export const zip = Pipeable(zip_);
