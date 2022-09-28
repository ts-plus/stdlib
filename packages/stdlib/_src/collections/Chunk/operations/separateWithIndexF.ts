/**
 * @tsplus static Chunk.Ops separateWithIndexF
 */
export const separateWithIndexF = WiltableWithIndex.implementSeparateWithIndexF<
  number,
  Chunk.HKT
>()(
  <A, B, R, E, G extends HKT>(_: {
    A: A
    B: B
    G: G
    R: R
    E: E
  }) =>
    (G: Applicative<G>) =>
      <B2>(f: (k: number, a: A) => HKT.Kind<G, R, E, Either<B, B2>>) =>
        (fa: Chunk<A>): HKT.Kind<G, R, E, readonly [Chunk<B>, Chunk<B2>]> =>
          G.map((self: Chunk<Either<B, B2>>) => self.separate)(Chunk.forEachWithIndexF(G)(f)(fa))
)
