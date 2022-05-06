/**
 * Apply both and return second.
 *
 * @tsplus operator Option >
 * @tsplus fluent Option zipRight
 */
export function zipRight_<A, B>(fa: Option<A>, fb: Option<B>): Option<B> {
  return fa.map(() => (b: B) => b).ap(fb);
}

/**
 * @tsplus static Option/Aspects zipRight
 */
export const zipRight = Pipeable(zipRight_);
