/**
 * Constructs an `Equivalence<Tuple<[A, B]>>` given an `Equivalence<A>` and
 * `Equivalence<B>` by comparing the `A` values for equality and then comparing
 * the `B` values for equality.
 *
 * @tsplus fluent Equivalence zip
 */
export function zip_<A, B>(
  self: Equivalence<A>,
  that: Equivalence<B>
): Equivalence<readonly [A, B]> {
  return Equivalence(
    ([x0, x1], [y0, y1]) => self.equals(x0, y0) && that.equals(x1, y1)
  )
}

/**
 * Constructs an `Equivalence<Tuple<[A, B]>>` given an `Equivalence<A>` and
 * `Equivalence<B>` by comparing the `A` values for equality and then comparing
 * the `B` values for equality.
 *
 * @tsplus static Equivalence/Aspects zip
 */
export const zip = Pipeable(zip_)
