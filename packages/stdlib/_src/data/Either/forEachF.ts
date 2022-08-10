/**
 * @tsplus static Either.Ops forEachF
 */
export const forEachF: ForEach.Fn<Either.HKT> = <G extends HKT>(
  G: IdentityBoth<G> & Covariant<G>
) =>
  <GR, GE, A, B>(f: (a: A) => HKT.Kind<G, GR, GE, B>) =>
    <FR, FE>(
      fa: HKT.Kind<Either.HKT, FR, FE, A>
    ): HKT.Kind<G, GR, GE, HKT.Kind<Either.HKT, FR, FE, B>> =>
      fa.isLeft() ? DSL.succeedF(G)(fa) : G.map((b: B) => Either.right(b))(f(fa.right))
