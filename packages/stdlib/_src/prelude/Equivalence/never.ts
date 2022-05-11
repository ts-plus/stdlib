/**
 * Equality for `never` values. Note that since there are not values of
 * type `never` the `equals` method of this instance can never be called
 * but it can be useful in deriving instances for more complex types.
 *
 * @tsplus static Equivalence/Ops never
 */
export const never: Equivalence<never> = Equivalence(() => false);
