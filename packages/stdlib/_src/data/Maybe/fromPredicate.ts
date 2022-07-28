/**
 * Returns a smart constructor based on the given predicate.
 *
 * @tsplus static Maybe.Ops fromPredicate
 */
export function fromPredicate<A, B extends A>(
  a: A,
  refinement: Refinement<A, B>
): Maybe<B>
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Maybe<A>
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Maybe<A> {
  return predicate(a) ? Maybe.some(a) : Maybe.none
}
