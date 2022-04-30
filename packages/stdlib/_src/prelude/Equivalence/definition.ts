/**
 * `Equivalence[A]` provides evidence that two values of type `A` can be
 * compared for equality.
 *
 * @tsplus type Equivalence
 */
export interface Equivalence<A> {
  readonly Law: {
    readonly Equivalence: "Equivalence";
  };
  /**
   * Returns whether two values of type `A` are equal.
   */
  readonly equals: (x: A, y: A) => boolean;
}

/**
 * @tsplus type EquivalenceOps
 */
export interface EquivalenceOps {
  /**
   * Constructs an `Equal<A>` from a function. The instance will be optimized
   * to first compare the values for reference equality and then compare the
   * values for value equality.
   */
  <A>(equals: (x: A, y: A) => boolean): Equivalence<A>;
}
export const Equivalence: EquivalenceOps = <A>(equals: (x: A, y: A) => boolean): Equivalence<A> =>
  HKT.instance({ equals });
