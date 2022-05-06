/**
 * Returns a smart constructor based on the given predicate.
 *
 * @tsplus static Option/Ops fromPredicate
 */
export function fromPredicate<A, B extends A>(
  a: A,
  refinement: Refinement<A, B>
): Option<B>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A>;
export function fromPredicate<A>(a: A, predicate: Predicate<A>): Option<A> {
  return predicate(a) ? Option.some(a) : Option.none;
}
