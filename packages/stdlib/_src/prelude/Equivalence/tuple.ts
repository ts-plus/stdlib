/**
 * Given a tuple of `Equivalence`s returns a `Equivalence` for the tuple.
 *
 * @tsplus static Equivalence/Ops tuple
 */
export function tuple<T extends ReadonlyArray<Equivalence<any>>>(
  ...eqs: T
): Equivalence<
  Readonly<
    {
      [K in keyof T]: T[K] extends Equivalence<infer A> ? A : never
    }
  >
> {
  return Equivalence((x, y) => eqs.every((E, i) => E.equals(x[i], y[i])))
}
