export declare const URI: unique symbol

/**
 * @tsplus type HKT/Ops
 */
export interface HKTOps {
  readonly T: unique symbol
  readonly F: unique symbol
  readonly R: unique symbol
  readonly E: unique symbol
  readonly A: unique symbol
}

export const HKT: HKTOps = {
  A: Symbol.for("@tsplus/stdlib/prelude/HKT/A"),
  E: Symbol.for("@tsplus/stdlib/prelude/HKT/E"),
  F: Symbol.for("@tsplus/stdlib/prelude/HKT/F"),
  R: Symbol.for("@tsplus/stdlib/prelude/HKT/R"),
  T: Symbol.for("@tsplus/stdlib/prelude/HKT/T")
} as HKTOps

/**
 * @tsplus type HKT
 */
export interface HKT {
  readonly [HKT.F]?: HKT
  readonly [HKT.R]?: (_: never) => never
  readonly [HKT.E]?: (_: never) => unknown
  readonly [HKT.A]?: (_: never) => unknown
  readonly [HKT.T]?: unknown
}

export declare namespace HKT {
  export type F = typeof HKT.F
  export type R = typeof HKT.R
  export type E = typeof HKT.E
  export type A = typeof HKT.A
  export type T = typeof HKT.T
  export type _R<X extends HKT> = X extends { [HKT.R]?: (_: infer R) => never } ? R : never
  export type _E<X extends HKT> = X extends { [HKT.E]?: (_: never) => infer E } ? E : never
  export type _A<X extends HKT> = X extends { [HKT.A]?: (_: never) => infer A } ? A : never

  export type Kind<F extends HKT, R, E, A> = (F & {
    readonly [HKT.F]?: F
    readonly [HKT.R]?: (_: R) => never
    readonly [HKT.E]?: (_: never) => E
    readonly [HKT.A]?: (_: never) => A
  }) extends {
    [HKT.T]?: infer X
  } ? X
    : {
      readonly [HKT.F]?: F
      readonly [HKT.R]?: (_: R) => never
      readonly [HKT.E]?: (_: never) => E
      readonly [HKT.A]?: (_: never) => A
    }

  export interface TypeClass<F extends HKT> {
    readonly [HKT.F]?: F
  }

  export type Infer<F extends HKT, P extends "R" | "E" | "A", K> = [K] extends [
    Kind<F, infer R, infer E, infer A>
  ] ? P extends "R" ? R
  : P extends "E" ? E
  : P extends "A" ? A
  : never
    : never

  export interface Generic<F extends HKT, R, E, A> {
    readonly [HKT.F]?: F
    readonly [HKT.R]?: (_: R) => never
    readonly [HKT.E]?: (_: never) => E
    readonly [HKT.A]?: (_: never) => A
  }
}

/**
 * @tsplus static HKT/Ops intersect
 */
export function intersect<As extends any[]>(
  ...as: As
): UnionToIntersection<As[number]> {
  const y = {}
  for (let i = 0; i < as.length; i++) {
    Object.assign(y, as[i])
  }
  // @ts-expect-error
  return y
}

/**
 * @tsplus static HKT/Ops instance
 * @tsplus macro identity
 */
export function instance<A>(a: Omit<A, "Law" | typeof URI>): A {
  return a as any
}
