/**
 * Folds an `AssociativeIdentity<A>` through a `Collection<A>`.
 *
 * @tsplus static AssociativeIdentity/Ops fold
 */
export function fold<A>(M: AssociativeIdentity<A>) {
  return (collection: Collection<A>): A => Associative.fold(M)(M.identity)(collection)
}
