/**
 * `Equivalence` for `Date` values.
 *
 * @tsplus static Equivalence/Ops date
 */
export const date: Equivalence<Date> = Equivalence.number.contramap((date: Date) => date.valueOf());
