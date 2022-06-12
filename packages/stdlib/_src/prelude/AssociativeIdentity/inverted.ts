/**
 * The dual of a `AssociativeIdentity`, obtained by swapping the arguments of `concat`.
 *
 * @tsplus getter AssociativeIdentity inverted
 */
export function inverted<A>(I: AssociativeIdentity<A>): AssociativeIdentity<A> {
  return AssociativeIdentity(I.identity, (x, y) => I.combine(y, x))
}
