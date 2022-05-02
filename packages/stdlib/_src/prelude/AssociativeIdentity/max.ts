/**
 * `AssociativeIdentity` that returns last max of elements.
 *
 * @tsplus static AssociativeIdentity/Ops max
 */
export function max<A>(B: Bounded<A>): AssociativeIdentity<A> {
  return AssociativeIdentity(B.bottom, Associative.max(B).combine);
}
