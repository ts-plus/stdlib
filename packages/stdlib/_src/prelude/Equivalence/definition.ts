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
export interface EquivalenceOps {}
export const Equivalence: EquivalenceOps = {};
