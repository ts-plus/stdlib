import * as A from "@tsplus/stdlib/prelude/AssociativeIdentity/definition";

/**
 * `AssociativeIdentity` instance for `Ordering`.
 *
 * @tsplus static Ordering/Ops AssociativeIdentity
 */
export const AssociativeIdentity = A.AssociativeIdentity.fromAssociative<Ordering>(
  0,
  Ordering.Associative
);
