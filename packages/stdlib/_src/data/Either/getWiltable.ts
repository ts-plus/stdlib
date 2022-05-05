/**
 * Get a `Wiltable` instance for an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Ops getWiltable
 */
export function getWiltable<E>(M: AssociativeIdentity<E>) {
  const separateF = Either.getSeparateF(M);
  return HKT.instance<Wiltable<Either.FixedLeftHKT<E>>>({
    separateF
  });
}
