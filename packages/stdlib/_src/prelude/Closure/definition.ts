/**
 * @tsplus type Closure
 */
export interface Closure<A> {
  readonly Law: { readonly Closure: "Closure" }
  readonly combine: (x: A, y: A) => A
}

/**
 * @tsplus type Closure/Ops
 */
export interface ClosureOps {
  <A>(combine: (x: A, y: A) => A): Closure<A>
}
export const Closure: ClosureOps = <A>(combine: (x: A, y: A) => A): Closure<A> =>
  HKT.instance({ combine })
