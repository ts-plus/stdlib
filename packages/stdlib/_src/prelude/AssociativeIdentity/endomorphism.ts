import type { Endomorphism } from "@tsplus/stdlib/data/Function";

/**
 * `AssociativeIdentity` for an `Endomorphism`.
 *
 * @tsplus static AssociativeIdentity/Ops endomorphism
 */
export function endomorphism<A>(): AssociativeIdentity<Endomorphism<A>> {
  return AssociativeIdentity((a) => a, (x, y) => (a) => x(y(a)));
}
