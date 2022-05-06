/**
 * @tsplus static Option/Ops forEachF
 */
export const forEachF = ForEach.implementForEachF<Option.HKT>()(
  <N, R, E, A, B, G extends HKT>(_: {
    A: A;
    B: B;
    G: G;
    N: N;
    R: R;
    E: E;
  }) =>
    (G: AssociativeBoth<G> & Any<G> & Covariant<G>) =>
      (f: (a: A) => HKT.Kind<G, R, E, B>) =>
        (fa: Option<A>): HKT.Kind<G, R, E, Option<B>> => {
          return fa.isNone() ? DSL.succeedF(G)(Option.none) : G.map((b: B) => Option.some(b))(f(fa.value));
        }
);
