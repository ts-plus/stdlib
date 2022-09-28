/**
 * @tsplus static ImmutableArray.Ops separateWithIndexF
 */
export const separateWithIndexF = WiltableWithIndex.implementSeparateWithIndexF<
  number,
  ImmutableArray.HKT
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
        (
          fa: ImmutableArray<A>
        ): HKT.Kind<G, R, E, readonly [ImmutableArray<B>, ImmutableArray<B2>]> =>
          G.map((self: ImmutableArray<Either<B, B2>>) => self.separate)(
            ImmutableArray.forEachWithIndexF(G)(f)(fa)
          )
)
