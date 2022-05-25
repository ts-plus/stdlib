export declare namespace Validation {
  export type Type<A extends Validation<any, any>> = [A] extends [Validation<infer _A, infer _K>] ? Validated<_A, _K>
    : never

  export interface Brand<A, K extends string> {
    [Validation.sym]: {
      [k in K]: A
    }
  }

  export type sym = Ops["sym"]

  /**
   * @tsplus type Validation/Ops
   */
  export interface Ops {
    readonly sym: unique symbol

    <A, K extends string>(predicate: (a: A) => boolean): Validation<A, K>
  }

  export type IsValidated<P extends Brand<any, any>> = {
    [k in keyof P[Validation.sym]]: P extends P[Validation.sym][k] ? 0 : 1
  }[keyof P[Validation.sym]] extends 0 ? unknown : never

  export type Validated<A, K extends string> = A & Brand<A, K>

  export type Unbranded<P extends Brand<any, any>> = P extends infer Q & Brands<P> ? Q : P

  export type Brands<P extends Brand<any, any>> = TypeLevel.UnionToIntersection<
    {
      [k in keyof P[Validation.sym]]: P extends P[Validation.sym][k]
        ? k extends string ? Brand<P[Validation.sym][k], k> : never
        : never
    }[keyof P[Validation.sym]]
  >
}

/**
 * @tsplus type Validation
 */
export interface Validation<A, K extends string> {
  readonly validate: (a: A) => a is A & Validation.Brand<A, K>
}

export const Validation: Validation.Ops = Object.assign(
  <A, K extends string>(predicate: (a: A) => boolean): Validation<A, K> => ({
    validate: (a: A): a is A & Validation.Brand<A, K> => predicate(a)
  }),
  {
    sym: Symbol() as Validation.sym
  }
)
