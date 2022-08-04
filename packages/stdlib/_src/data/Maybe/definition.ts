/* adapted from https://github.com/gcanti/fp-ts */
/**
 * @tsplus type Maybe
 */
export type Maybe<A> = None | Some<A>

export interface MaybeF extends HKT {
  readonly type: Maybe<this["A"]>
}

export declare namespace Maybe {
  export type HKT = MaybeF
}

/**
 * @tsplus type Maybe.Ops
 */
export interface MaybeOps {
  $: MaybeAspects
}
export const Maybe: MaybeOps = {
  $: {}
}

/**
 * @tsplus type Maybe.Aspects
 */
export interface MaybeAspects {}

const _noneHash = Hash.string("Maybe.None")
const _someHash = Hash.string("Maybe.Some")

/**
 * Definitions
 *
 * @tsplus type Maybe.None
 */
export class None implements Equals {
  readonly _tag = "None";

  [Equals.sym](that: unknown): boolean {
    return that instanceof None
  }
  [Hash.sym](): number {
    return _noneHash
  }
}

/**
 * @tsplus type Maybe.Some
 */
export class Some<A> implements Equals {
  readonly _tag = "Some"

  constructor(readonly value: A) {}

  [Equals.sym](that: unknown): boolean {
    return that instanceof Some && Equals.equals(this.value, that.value)
  }
  [Hash.sym](): number {
    return Hash.combine(_someHash, Hash.unknown(this.value))
  }
}

/**
 * @tsplus unify Maybe
 * @tsplus unify Maybe.Some
 * @tsplus unify Maybe.None
 */
export function unifyMaybe<X extends Maybe<any>>(
  self: X
): Maybe<[X] extends [Maybe<infer A>] ? A : never> {
  return self
}

export type ArrayOfMaybies<Ts extends Maybe<any>[]> = {
  [k in keyof Ts]: Ts[k] extends Maybe<infer A> ? A : never
}[number]

/**
 * Constructs `None`.
 *
 * @tsplus static Maybe.Ops none
 */
export const none: Maybe<never> = new None()

/**
 * Constructs `None`.
 *
 * @tsplus static Maybe.Ops empty
 */
export function empty<A = never>(): Maybe<A> {
  return none
}

/**
 * Constructs `Some<A>`.
 *
 * @tsplus static Maybe.Ops some
 */
export function some<A>(a: A): Maybe<A> {
  return new Some(a)
}

/**
 * Returns `true` if the maybe is `None`, `false` otherwise.
 *
 * @tsplus fluent Maybe isNone
 */
export function isNone<A>(fa: Maybe<A>): fa is None {
  return fa._tag === "None"
}

/**
 * Returns `true` if the maybe is an instance of `Some`, `false` otherwise.
 *
 * @tsplus fluent Maybe isSome
 */
export function isSome<A>(fa: Maybe<A>): fa is Some<A> {
  return fa._tag === "Some"
}

/**
 * @tsplus static Maybe.Ops isMaybe
 */
export function isMaybe(u: unknown): u is Maybe<unknown> {
  return (
    typeof u === "object" &&
    u != null &&
    "_tag" in u &&
    (u["_tag"] === "Some" || u["_tag"] === "None")
  )
}
