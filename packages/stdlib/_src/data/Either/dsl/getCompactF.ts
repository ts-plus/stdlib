/**
 * Get `Witherable`'s `compactF` for an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Ops getCompactF
 */
export function getCompactF<E>(M: AssociativeIdentity<E>): Wither<Either.FixedLeftHKT<E>> {
  const compact = Either.$.compactOption(M)
  return HKT.instance(
    <G extends HKT>(G: Applicative<G>) =>
      <GR, GE, A, B>(f: (a: A) => HKT.Kind<G, GR, GE, Option<B>>) =>
        (either: Either<E, A>) => {
          const traverseF = Either.forEachF(G)
          return G.map((e: Either<E, Option<B>>) => compact(e))(traverseF(f)(either))
        }
  )
}
