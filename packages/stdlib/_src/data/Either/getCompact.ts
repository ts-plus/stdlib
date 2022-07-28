/**
 * Get a `Compact` instance for an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either.Ops getCompact
 */
export function getCompact<E>(M: AssociativeIdentity<E>) {
  const compact = Either.$.compactMaybe(M)
  return HKT.instance<Compact<Either.FixedLeftHKT<E>>>({
    compact
  })
}
