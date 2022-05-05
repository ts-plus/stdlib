/**
 * Get a `Compactable` for an `Either` given an `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Ops getCompactable
 */
export function getCompactable<E>(M: AssociativeIdentity<E>) {
  const C = Either.getCompact(M);
  const S = Either.getSeparate(M);
  return HKT.instance<Compactable<Either.FixedLeftHKT<E>>>({
    ...C,
    ...S
  });
}
