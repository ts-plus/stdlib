/**
 * @tsplus static Option/Ops separateF
 */
export const separateF = Wiltable.implementSeparateF<Option.HKT>()(
  <FR, FE, A, B, B2, G extends HKT>(_: {
    A: A;
    B: B;
    G: G;
    FR: FR;
    FE: FE;
  }) =>
    (G: Applicative<G>) =>
      (f: (a: A) => HKT.Kind<G, FR, FE, Either<B, B2>>) =>
        (fa: Option<A>): HKT.Kind<G, FR, FE, Tuple<[Option<B>, Option<B2>]>> => {
          const option = fa.map((a) => G.map((e: Either<B, B2>) => Tuple(e.left, e.right))(f(a)));
          return option.isNone() ? DSL.succeedF(G)(Tuple(Option.none, Option.none)) : option.value;
        }
);
