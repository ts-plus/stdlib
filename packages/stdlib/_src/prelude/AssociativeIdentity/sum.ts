/**
 * Number `AssociativeIdentity` under addition.
 *
 * @tsplus static AssociativeIdentity/Ops sum
 */
export const sum: AssociativeIdentity<number> = AssociativeIdentity.fromAssociative(
  0,
  Associative.sum
)
