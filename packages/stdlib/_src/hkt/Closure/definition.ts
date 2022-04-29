/**
 * @tsplus type Closure
 */
export interface Closure<A> {
  readonly _Closure: "Closure";
  readonly combine: (x: A, y: A) => A;
}

/**
 * @tsplus type Closure/Ops
 */
export interface ClosureOps {}
export const Closure: ClosureOps = {};

export interface ClosureF extends HKT {
  readonly type: Closure<this["A"]>;
}
