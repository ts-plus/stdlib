/**
 * Derives an `Equivalence<Array<A>>` given an `Equivalence<A>`.
 *
 * @tsplus static Equivalence/Ops array
 */
export function array<A>(E: Equivalence<A>): Equivalence<ReadonlyArray<A>> {
  return Equivalence((x, y) => {
    if (x.length === y.length) {
      for (let i = 0; i < x.length; i++) {
        if (!E.equals(x[i]!, y[i]!)) {
          return false
        }
      }
      return true
    }
    return false
  })
}
