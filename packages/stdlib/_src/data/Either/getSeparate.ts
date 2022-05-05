/**
 * Get a `Separate` instance for an `Either<E, A>` given an
 * `AssociativeIdentity<E>`.
 *
 * @tsplus static Either/Ops getSeparate
 */
export function getSeparate<E>(M: AssociativeIdentity<E>) {
  const separate = Either.$.separate(M);
  return HKT.instance<Separate<Either.FixedLeftHKT<E>>>({
    separate
  });
}
