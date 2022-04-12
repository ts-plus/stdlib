export declare namespace Validation {
  export type Type<A extends Validation<any, any>> = [A] extends [Validation<infer _A, infer _K>] ? Validated<_A, _K>
    : never;

  export interface Brand<A, K extends string> {
    [Validation.sym]: {
      [k in K]: A;
    };
  }

  export type IsValidated<P extends Brand<any, any>> = {
    [k in keyof P[ValidationOps["sym"]]]: P extends P[ValidationOps["sym"]][k] ? 0 : 1;
  }[keyof P[ValidationOps["sym"]]] extends 0 ? unknown : never;

  export type Validated<A, K extends string> = A & Brand<A, K>;

  export type Unbranded<P extends Brand<any, any>> = P extends infer Q & Brands<P> ? Q : P;

  export type Brands<P extends Brand<any, any>> = TypeLevel.UnionToIntersection<
    {
      [k in keyof P[ValidationOps["sym"]]]: P extends P[ValidationOps["sym"]][k]
        ? k extends string ? Brand<P[ValidationOps["sym"]][k], k> : never
        : never;
    }[keyof P[ValidationOps["sym"]]]
  >;
}

/**
 * @tsplus type Validation
 */
export interface Validation<A, K extends string> {
  readonly validate: (a: A) => a is A & Validation.Brand<A, K>;
}

/**
 * @tsplus type Validation/Ops
 */
export interface ValidationOps {
  readonly sym: unique symbol;

  <A, K extends string>(predicate: (a: A) => boolean): Validation<A, K>;
}

export const Validation: ValidationOps = Object.assign(
  <A, K extends string>(predicate: (a: A) => boolean): Validation<A, K> => ({
    validate: (a: A): a is A & Validation.Brand<A, K> => predicate(a)
  }),
  {
    sym: Symbol() as ValidationOps["sym"]
  }
);
