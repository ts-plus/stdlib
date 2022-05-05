/**
 * Get a `Witherable` for an `Either<E, A>` given an `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Ops getWitherable
 */
export function getWitherable<E>(M: AssociativeIdentity<E>) {
  const compactF = Either.getCompactF(M);
  return HKT.instance<Witherable<Either.FixedLeftHKT<E>>>({
    compactF
  });
}
