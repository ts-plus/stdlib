/**
 * Get `Wiltable`'s `separateF` for an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either.Ops getSeparateF
 */
export function getSeparateF<E>(M: AssociativeIdentity<E>): Wilt<Either.FixedLeftHKT<E>> {
  const separate = Either.$.separate(M)
  return HKT.instance(
    <G extends HKT>(G: Applicative<G>) =>
      <GR, GE, A, B, B2>(
        f: (a: A) => HKT.Kind<G, GR, GE, Either<B, B2>>
      ) =>
        (either: Either<E, A>) => {
          const traverseF = Either.forEachF(G)
          return G.map((e: Either<E, Either<B, B2>>) => separate(e))(traverseF(f)(either))
        }
  )
}
