/**
 * @tsplus type Recursive/Unfolder
 * @tsplus companion Recursive/Unfolder/Ops
 */
export class Unfolder<F extends HKT, A> {
  constructor(readonly fn: Unfolder.Fn<F, A>) {}
}
export declare namespace Unfolder {
  /**
   * A function to _generate_ a single value of a recursive structure from a seed-value
   * aka _anamorphism_
   */
  export type Fn<F extends HKT, A> = (f: A) => HKT.Kind<F, unknown, never, A>
}
