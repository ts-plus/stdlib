/**
 * @tsplus static Chunk.Ops separateF
 */
export const separateF = Wiltable.implementSeparateF<Chunk.HKT>()(
  <FR, FE, A, B, B2, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>) =>
        (fa: Chunk<A>): HKT.Kind<G, FR, FE, readonly [Chunk<B>, Chunk<B2>]> =>
          G.map((self: Chunk<Either<B, B2>>) => self.separate)(Chunk.forEachF(G)(f)(fa))
)
