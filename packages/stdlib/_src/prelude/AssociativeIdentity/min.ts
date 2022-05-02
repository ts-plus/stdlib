/**
 * `AssociativeIdentity` that returns last min of elements.
 *
 * @tsplus static AssociativeIdentity/Ops min
 */
export function min<A>(B: Bounded<A>): AssociativeIdentity<A> {
  return AssociativeIdentity(B.top, Associative.min(B).combine);
}
