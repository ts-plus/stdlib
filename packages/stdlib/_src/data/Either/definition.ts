/**
 * adapted from https://github.com/gcanti/fp-ts
 */

/**
 * @tsplus type Either
 */
export type Either<E, A> = Left<E> | Right<A>

export interface EitherF extends HKT {
  readonly type: Either<this["E"], this["A"]>
}

export interface EitherFixedLeftF<E> extends HKT {
  readonly type: HKT.Kind<EitherF, this["R"], E, this["A"]>
}

/**
 * @tsplus type Either.Ops
 */
export interface EitherOps {
  $: EitherAspects
}
export const Either: EitherOps = {
  $: {}
}

/**
 * @tsplus type Either.Aspects
 */
export interface EitherAspects {}

export declare namespace Either {
  export type HKT = EitherF
  export type FixedLeftHKT<E> = EitherFixedLeftF<E>
}

/**
 * @tsplus type Either.Left
 */
export interface Left<E> {
  readonly _tag: "Left"
  readonly left: E
}

/**
 * @tsplus type Either.Right
 */
export interface Right<A> {
  readonly _tag: "Right"
  readonly right: A
}

/**
 * @tsplus unify Either
 * @tsplus unify Either.Left
 * @tsplus unify Either.Right
 */
export function unifyEither<X extends Either<any, any>>(
  self: X
): Either<
  X extends Left<infer EX> ? EX : never,
  X extends Right<infer AX> ? AX : never
> {
  return self
}

/**
 * Returns `true` if the `Either` is an instance of `Left`, `false` otherwise.
 *
 * @tsplus fluent Either isLeft
 */
export function isLeft<E, A>(ma: Either<E, A>): ma is Left<E> {
  return ma._tag === "Left"
}

/**
 * Returns `true` if the `Either` is an instance of `Right`, `false` otherwise.
 *
 * @tsplus fluent Either isRight
 */
export function isRight<E, A>(ma: Either<E, A>): ma is Right<A> {
  return ma._tag === "Right"
}

/**
 * @tsplus getter Either left
 */
export function getLeft<E, A>(self: Either<E, A>): Maybe<E> {
  return self._tag === "Left" ? Maybe.some(self.left) : Maybe.none
}

/**
 * @tsplus static Either.Ops isEither
 */
export function isEither(u: unknown): u is Either<unknown, unknown> {
  return (
    typeof u === "object" &&
    u != null &&
    "_tag" in u &&
    (u["_tag"] === "Left" || u["_tag"] === "Right")
  )
}

/**
 * @tsplus getter Either right
 */
export function getRight<E, A>(self: Either<E, A>): Maybe<A> {
  return self._tag === "Right" ? Maybe.some(self.right) : Maybe.none
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a
 * successful value due to the right bias of this structure.
 *
 * @tsplus static Either.Ops right
 * @tsplus static Either.Ops __call
 */
export function right<A>(a: A): Either<never, A> {
  return { _tag: "Right", right: a }
}

/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a
 * successful value due to the right bias of this structure.
 *
 * @tsplus static Either.Ops rightW
 */
export function rightW<A, E = never>(a: A): Either<E, A> {
  return { _tag: "Right", right: a }
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a
 * failure, due to the right-bias of this structure.
 *
 * @tsplus static Either.Ops left
 */
export function left<E>(e: E): Either<E, never> {
  return { _tag: "Left", left: e }
}

/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a
 * failure, due to the right-bias of this structure.
 *
 * @tsplus static Either.Ops leftW
 */
export function leftW<E, A = never>(e: E): Either<E, A> {
  return { _tag: "Left", left: e }
}

/**
 * Widen left side `Either[E, A] => Either[E | E1, A]`.
 *
 * @tsplus getter Either widenE
 * @tsplus macro identity
 */
export function widenE_<E, A, E1>(self: Either<E, A>): Either<E | E1, A> {
  return self
}

/**
 * Widen left side `Either[E, A] => Either[E | E1, A]`.
 *
 * @tsplus static Either.Aspects widenE
 */
export function widenE<E1>() {
  return (
    /**
     * @tsplus macro identity
     */
    <E, A>(self: Either<E, A>): Either<E | E1, A> => self
  )
}

/**
 * Widen left side `Either[E, A] => Either[E | E1, A]`.
 *
 * @tsplus getter Either widenA
 * @tsplus macro identity
 */
export function widenA_<E, A, A1>(self: Either<E, A>): Either<E, A | A1> {
  return self
}

/**
 * Widen right side `Either[E, A] => Either[E, A | A1]`.
 *
 * @tsplus static Either.Aspects widenA
 */
export function widenA<A1>() {
  return (
    /**
     * @tsplus macro identity
     */
    <E, A>(self: Either<E, A>): Either<E, A | A1> => self
  )
}

/**
 * @tsplus operator Either ==
 */
export function equals<E, A, E1, B>(a: Either<E, A>, b: Either<E1, B>) {
  return Equals.equals(a, b)
}
