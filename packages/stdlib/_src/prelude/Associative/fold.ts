/**
 * Fold `Associative` through a `Collection`.
 *
 * @tsplus static Associative/Ops fold
 */
export function fold<A>(S: Associative<A>) {
  return (init: A) => (collection: Collection<A>): A => collection.reduce(init, (x, y) => S.combine(x, y))
}
