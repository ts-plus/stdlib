/**
 * Returns a `Associative` such that `combine(ord2)(ord1)`  will order first by
 * `ord1`, and then by `ord2`.
 *
 * @tsplus static Ord/Ops getAssociative
 */
export function getAssociative<A = never>(): Associative<Ord<A>> {
  return Associative((x, y) =>
    Ord((a, b) => Ordering.Associative.combine(x.compare(a, b), y.compare(a, b)))
  )
}
