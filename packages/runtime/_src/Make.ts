/**
 * @tsplus type PlainMake
 * @tsplus derive nominal
 */
export interface PlainMake<in out A> {
  readonly make: (value: A) => A
}

/**
 * @tsplus type Make/Ops
 */
export interface MakeOps {}
export const Make: MakeOps = {}

/**
 * @tsplus static Make/Ops __call
 */
export function make<A>(): PlainMake<A> {
  return {
    make: (a) => a
  }
}

/**
 * @tsplus derive PlainMake<_> 10
 */
export function deriveMake<A>(
  ..._: []
): PlainMake<A> {
  return {
    make: (a) => a
  }
}

export type Make<X> = ([X] extends [Brand.Valid<any, any>] ? Brand.MakeValidated<X>
  : [X] extends [Brand<any>] ? Brand.Make<X>
  : PlainMake<X>)
