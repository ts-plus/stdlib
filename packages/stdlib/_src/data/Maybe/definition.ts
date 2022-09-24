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

/**
 * Definitions
 *
 * @tsplus type Maybe.None
 */
export interface None {
  readonly _tag: "None"
}

/**
 * @tsplus type Maybe.Some
 */
export interface Some<A> {
  readonly _tag: "Some"
  readonly value: A
}

/**
 * @tsplus unify Maybe
 * @tsplus unify Maybe.Some
 * @tsplus unify Maybe.None
 */
export function unifyMaybe<X extends Maybe<any>>(
  self: X
): Maybe<X extends Some<infer A> ? A : never> {
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
export const none: Maybe<never> = { _tag: "None" }

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
  return { _tag: "Some", value: a }
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

/**
 * @tsplus operator Maybe ==
 */
export function equals<A, B>(a: Maybe<A>, b: Maybe<B>) {
  return Equals.equals(a, b)
}
