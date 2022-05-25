/**
 * Given a struct of `Equivalence`s returns a `Equivalence` for the struct.
 *
 * @tsplus static Equivalence/Ops struct
 */
export function struct<O extends Record<string, any>>(
  eqs: {
    [K in keyof O]: Equivalence<O[K]>
  }
): Equivalence<O> {
  return Equivalence((x, y) => {
    for (const k in eqs) {
      if (!eqs[k].equals(x[k], y[k])) {
        return false
      }
    }
    return true
  })
}
