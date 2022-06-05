/**
 * @tsplus type Recursive/Unfolder
 * @tsplus companion Recursive/Unfolder/Ops
 */
export class Unfolder<F extends HKT, A> {
  constructor(readonly fn: Unfolder.Fn<F, A>){}
}
export declare namespace Unfolder {
  export type Fn<F extends HKT, A> = (f: A) => HKT.Kind<F, unknown, never, A>
}
