/**
 * @tsplus static ImmutableArray.Ops compactWithIndexF
 */
export const compactWithIndexF = WitherableWithIndex.implementCompactWithIndexF<number, ImmutableArray.HKT>()(
  <FR, FE, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (k: number, a: A) => HKT.Kind<G, FR, FE, Maybe<B>>) =>
        (fa: ImmutableArray<A>): HKT.Kind<G, FR, FE, ImmutableArray<B>> =>
          G.map((self: ImmutableArray<Maybe<B>>) => self.compact)(ImmutableArray.forEachWithIndexF(G)(f)(fa))
)
