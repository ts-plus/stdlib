/**
 * Equality for `unknown` values. Note that since values of type `unknown` contain
 * no information, all values of type `unknown` can be treated as equal to each
 * other.
 *
 * @tsplus static Equivalence/Ops any
 */
export const any: Equivalence<unknown> = Equivalence(() => true);
