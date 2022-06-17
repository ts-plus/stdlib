/**
 * @tsplus static Maybe/Ops forEachF
 */
export const forEachF = ForEach.implementForEachF<Maybe.HKT>()(
  <N, R, E, A, B, G extends HKT>(_: {
    A: A
    B: B
    G: G
    N: N
    R: R
    E: E
  }) =>
    (G: AssociativeBoth<G> & Any<G> & Covariant<G>) =>
      (f: (a: A) => HKT.Kind<G, R, E, B>) =>
        (fa: Maybe<A>): HKT.Kind<G, R, E, Maybe<B>> => {
          return fa.isNone() ? DSL.succeedF(G)(Maybe.none) : G.map((b: B) => Maybe.some(b))(f(fa.value))
        }
)
