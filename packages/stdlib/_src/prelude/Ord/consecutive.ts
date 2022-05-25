/**
 * Order by first, second, third, etc.
 *
 * @tsplus static Ord/Ops consecutive
 */
export function consecutive<A>(...ords: Array<Ord<A>>): Ord<A> {
  return AssociativeIdentity.fold(Ord.getAssociativeIdentity<A>())(ords)
}
