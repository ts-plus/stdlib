/**
 * Replaces the element in position `I`.
 *
 * @tsplus static Tuple.Aspects update
 * @tsplus pipeable Tuple update
 */
export function update<Ks extends readonly unknown[], I extends keyof Ks & number, J>(
  i: I,
  f: (_: Ks[I]) => J
) {
  return (self: Tuple<Ks>): Tuple<
    ForcedArray<
      {
        [k in keyof Ks]: k extends `${I}` ? J : Ks[k]
      }
    >
  > => {
    const len = self.tuple.length
    const r = new Array(len)
    for (let k = 0; k < len; k++) {
      if (k === i) {
        r[k] = f(self.tuple[k])
      } else {
        r[k] = self.tuple[k]
      }
    }
    return new Tuple(r) as any
  }
}
