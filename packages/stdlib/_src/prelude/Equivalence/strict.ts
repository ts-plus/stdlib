/**
 * Constructs an `Equivalence<A>` that uses the default notion of equality
 * embodied in the implementation of `equals` for values of type `A`.
 *
 * @tsplus static Equivalence/Ops strict
 */
export function strict<A>() {
  return Equivalence<A>((x, y) => x === y);
}
