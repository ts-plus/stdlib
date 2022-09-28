/**
 * @tsplus static ImmutableArray.Ops forEachWithIndexF
 */
export const forEachWithIndexF = ForEachWithIndex.implementForEachWithIndexF<
  number,
  ImmutableArray.HKT
>()(
  (_) =>
    (G) =>
      (f) =>
        (fa) => {
          const succeed = DSL.succeedF(G)
          let base = succeed<ImmutableArray<typeof _.B>, typeof _.R, typeof _.E>(
            ImmutableArray.empty()
          )
          for (let i = 0; i < fa.array.length; i = i + 1) {
            base = G.map(
              ([bs, b]: readonly [ImmutableArray<typeof _.B>, typeof _.B]) => bs.append(b)
            )(G.both(f(i, fa.array[i]!))(base))
          }
          return base
        }
)
