/**
 * @tsplus static Chunk/Ops compactF
 */
export const compactF = Witherable.implementCompactF<Chunk.HKT>()(
  <FR, FE, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Maybe<B>>) =>
        (fa: Chunk<A>): HKT.Kind<G, FR, FE, Chunk<B>> =>
          G.map((self: Chunk<Maybe<B>>) => self.compact)(Chunk.forEachF(G)(f)(fa))
)
