/**
 * @tsplus static Tree.Ops forEachF
 */
export const forEachF = ForEach.implementForEachF<Tree.HKT>()(
  (_) =>
    (G) => {
      const forEachFChunk = Chunk.forEachF(G)
      return function(f) {
        const go = (a: Tree<typeof _.A>) => pipe(a, forEachF(G)(f))
        return (fa) => {
          return pipe(
            f(fa.value),
            G.both(forEachFChunk(go)(fa.forest)),
            G.map(([b, bs]) => Tree(b, bs))
          )
        }
      }
    }
)
