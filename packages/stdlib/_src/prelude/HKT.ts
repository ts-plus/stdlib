export declare const URI: unique symbol

/**
 * @tsplus type HKT
 */
export interface HKT {
  readonly R?: unknown
  readonly E?: unknown
  readonly A?: unknown
  readonly type?: unknown
}

/**
 * @tsplus type HKT/Ops
 */
export interface HKTOps {}
export const HKT: HKTOps = {}

export declare namespace HKT {
  export interface Typeclass<F extends HKT> {
    readonly [URI]: F
  }

  export type Kind<F extends HKT, R, E, A> = F extends { readonly type: unknown } ? (F & {
    readonly R: R
    readonly E: E
    readonly A: A
  })["type"]
    : {
      readonly _F: F
      readonly _R: (_: R) => void
      readonly _E: () => E
      readonly _A: () => A
    }

  export type Infer<F extends HKT, P extends "R" | "E" | "A", K> = [K] extends [
    Kind<F, infer R, infer E, infer A>
  ] ? P extends "R" ? R
  : P extends "E" ? E
  : P extends "A" ? A
  : never
    : never

  export interface ComposeF<F extends HKT, G extends HKT> extends HKT {
    readonly type: Kind<F, this["R"], this["E"], Kind<G, this["R"], this["E"], this["A"]>>
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
