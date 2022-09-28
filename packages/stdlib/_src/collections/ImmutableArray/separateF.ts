/**
 * @tsplus static ImmutableArray.Ops separateF
 */
export const separateF = Wiltable.implementSeparateF<ImmutableArray.HKT>()(
  <FR, FE, A, B, B2, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>) =>
        (
          fa: ImmutableArray<A>
        ): HKT.Kind<G, FR, FE, readonly [ImmutableArray<B>, ImmutableArray<B2>]> =>
          G.map((self: ImmutableArray<Either<B, B2>>) => self.separate)(
            ImmutableArray.forEachF(G)(f)(fa)
          )
)
