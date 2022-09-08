/**
 * @tsplus type Recursive/Unfolder
 * @tsplus companion Recursive/Unfolder/Ops
 */
export class Unfolder<F extends HKT, A, E = unknown> {
  constructor(readonly fn: Unfolder.Fn<F, A, E>) {}
}
export declare namespace Unfolder {
  /**
   * A function to _generate_ a single value of a recursive structure from a seed-value
   * aka _anamorphism_
   */
  export type Fn<F extends HKT, A, E = unknown, R = unknown> = (f: A) => HKT.Kind<F, R, E, A>
}
