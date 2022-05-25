/**
 * Constructs an `Equivalence<B>` given an `Equivalence<A>` and a function `f`
 * to transform a `B` value into an `A` value. The instance will convert each
 * `B` value into an `A` and the compare the `A` values for equality.
 *
 * @tsplus fluent Equivalence contramap
 */
export function contramap_<A, B>(self: Equivalence<A>, f: (b: B) => A): Equivalence<B> {
  return Equivalence((x, y) => self.equals(f(x), f(y)))
}

/**
 * Constructs an `Equivalence<B>` given an `Equivalence<A>` and a function `f`
 * to transform a `B` value into an `A` value. The instance will convert each
 * `B` value into an `A` and the compare the `A` values for equality.
 *
 * @tsplus static Equivalence/Aspects contramap
 */
export const contramap = Pipeable(contramap_)
