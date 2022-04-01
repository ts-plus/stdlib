import type { Lazy } from "@tsplus/stdlib/data/Function";

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
export type Eval<A> = Succeed<A> | FlatMap<any, A> | Suspend<A>;

export const EvalSym = Symbol.for("@tsplus/stdlib/io/Eval");
export type EvalSym = typeof EvalSym;

export const _A = Symbol.for("@tsplus/stdlib/io/Eval/A");
export type _A = typeof _A;

/**
 * @tsplus type Eval/Ops
 */
export interface EvalOps {
  $: EvalAspects;
}
export const Eval: EvalOps = {
  $: {}
};

/**
 * @tsplus type Eval/Aspects
 */
export interface EvalAspects {}

/**
 * @tsplus unify Eval
 */
export function unifyEval<X extends Eval<any>>(self: X): Eval<[X] extends [Eval<infer AX>] ? AX : never> {
  return self;
}

export class Succeed<A> {
  readonly _tag = "Succeed";

  readonly [EvalSym]: EvalSym = EvalSym;
  readonly [_A]!: () => A;

  constructor(readonly a: Lazy<A>) {}
}

export class Suspend<A> {
  readonly _tag = "Suspend";

  readonly [EvalSym]: EvalSym = EvalSym;
  readonly [_A]!: () => A;

  constructor(readonly f: Lazy<Eval<A>>) {}
}

export class FlatMap<A, B> {
  readonly _tag = "FlatMap";

  readonly [EvalSym]: EvalSym = EvalSym;
  readonly [_A]!: () => A;

  constructor(readonly value: Eval<A>, readonly cont: (a: A) => Eval<B>) {}
}
