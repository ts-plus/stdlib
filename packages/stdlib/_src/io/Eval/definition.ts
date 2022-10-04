import type { Lazy } from "@tsplus/stdlib/data/Function"

/**
 * `Eval<A>` is a purely functional description of a computation.
 *
 * Note: while for general cases the `Sync` data type is preferrable,
 * this data type is designed for speed and low allocations,
 * it is internally used to suspend recursive procedures but can be
 * useful whenever you need a fast sync computation that cannot fail
 * and that doesn't require any environment.
 *
 * @tsplus type Eval
 */
export interface Eval<A> {
  readonly _A: () => A
  readonly _TypeId: unique symbol
}

export type EvalInternal<A> = Succeed<A> | FlatMap<any, A> | Suspend<A>

export const EvalSym = Symbol.for("@tsplus/stdlib/io/Eval")
export type EvalSym = typeof EvalSym

export const _A = Symbol.for("@tsplus/stdlib/io/Eval/A")
export type _A = typeof _A

/**
 * @tsplus type Eval.Ops
 */
export interface EvalOps {
  $: EvalAspects
}
export const Eval: EvalOps = {
  $: {}
}

/**
 * @tsplus type Eval.Aspects
 */
export interface EvalAspects {}

/**
 * @tsplus unify Eval
 */
export function unifyEval<X extends Eval<any>>(
  self: X
): Eval<[X] extends [Eval<infer AX>] ? AX : never> {
  return self
}

export interface Succeed<A> extends Eval<A> {}
export class Succeed<A> implements Equals {
  readonly _tag = "Succeed"

  readonly [EvalSym]: EvalSym = EvalSym
  readonly [_A]!: () => A

  constructor(readonly a: Lazy<A>) {}

  [Equals.sym](that: unknown) {
    return this === that
  }

  [Hash.sym]() {
    return Hash.randomCached(this)
  }
}

export interface Suspend<A> extends Eval<A> {}
export class Suspend<A> implements Equals {
  readonly _tag = "Suspend"

  readonly [EvalSym]: EvalSym = EvalSym
  readonly [_A]!: () => A

  constructor(readonly f: Lazy<EvalInternal<A>>) {}

  [Equals.sym](that: unknown) {
    return this === that
  }

  [Hash.sym]() {
    return Hash.randomCached(this)
  }
}

export interface FlatMap<A, B> extends Eval<B> {}
export class FlatMap<A, B> implements Equals {
  readonly _tag = "FlatMap"

  readonly [EvalSym]: EvalSym = EvalSym
  readonly [_A]!: () => A

  constructor(readonly value: EvalInternal<A>, readonly cont: (a: A) => EvalInternal<B>) {}

  [Equals.sym](that: unknown) {
    return this === that
  }

  [Hash.sym]() {
    return Hash.randomCached(this)
  }
}

export interface EvalF extends HKT {
  readonly type: Eval<this["A"]>
}
export declare namespace Eval {
  export type HKT = EvalF
}
