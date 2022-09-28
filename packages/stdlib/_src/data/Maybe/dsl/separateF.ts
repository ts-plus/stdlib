/**
 * @tsplus static Maybe.Ops separateF
 */
export const separateF = Wiltable.implementSeparateF<Maybe.HKT>()(
  <FR, FE, A, B, B2, G extends HKT>(_: {
    A: A
    B: B
    G: G
    FR: FR
    FE: FE
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>) =>
        (fa: Maybe<A>): HKT.Kind<G, FR, FE, readonly [Maybe<B>, Maybe<B2>]> => {
          const maybe = fa.map((a) => G.map((e: Either<B, B2>) => [e.left, e.right] as const)(f(a)))
          return maybe.isNone() ? DSL.succeedF(G)([Maybe.none, Maybe.none]) : maybe.value
        }
)
