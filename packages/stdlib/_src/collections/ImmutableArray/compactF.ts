/**
 * @tsplus static ImmutableArray.Ops compactF
 */
export const compactF = Witherable.implementCompactF<ImmutableArray.HKT>()(
  <FR, FE, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Maybe<B>>) =>
        (fa: ImmutableArray<A>): HKT.Kind<G, FR, FE, ImmutableArray<B>> =>
          G.map((self: ImmutableArray<Maybe<B>>) => self.compact)(ImmutableArray.forEachF(G)(f)(fa))
)
