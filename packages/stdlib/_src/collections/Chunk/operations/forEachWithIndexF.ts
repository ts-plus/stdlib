/**
 * @tsplus static Chunk.Ops forEachWithIndexF
 */
export const forEachWithIndexF = ForEachWithIndex.implementForEachWithIndexF<number, Chunk.HKT>()(
  (_) =>
    (G) =>
      (f) =>
        (fa) => {
          const succeed = DSL.succeedF(G)
          let base = succeed<Chunk<typeof _.B>, typeof _.R, typeof _.E>(Chunk.empty())
          for (let i = 0; i < fa.length; i = i + 1) {
            base = G.map(
              ([bs, b]: readonly [Chunk<typeof _.B>, typeof _.B]) => bs.append(b)
            )(G.both(f(i, fa.unsafeGet(i)!))(base))
          }
          return base
        }
)
