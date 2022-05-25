/**
 * Apply both and return first.
 *
 * @tsplus operator Option <
 * @tsplus fluent Option zipLeft
 */
export function zipLeft_<A, B>(fa: Option<A>, fb: Option<B>): Option<A> {
  return fa.map((a) => () => a).ap(fb)
}

/**
 * @tsplus static Option/Aspects zipLeft
 */
export const zipLeft = Pipeable(zipLeft_)
