/**
 * @tsplus static Chunk.Ops compactWithIndexF
 */
export const compactWithIndexF = WitherableWithIndex.implementCompactWithIndexF<number, Chunk.HKT>()(
  <FR, FE, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (k: number, a: A) => HKT.Kind<G, FR, FE, Maybe<B>>) =>
        (fa: Chunk<A>): HKT.Kind<G, FR, FE, Chunk<B>> =>
          G.map((self: Chunk<Maybe<B>>) => self.compact)(Chunk.forEachWithIndexF(G)(f)(fa))
)
