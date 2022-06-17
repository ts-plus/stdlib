/**
 * Flattens nested options.
 *
 * @tsplus getter Maybe flatten
 * @tsplus static Maybe/Aspects flatten
 */
export function flatten<A>(fa: Maybe<Maybe<A>>): Maybe<A> {
  return fa.flatMap(identity)
}
