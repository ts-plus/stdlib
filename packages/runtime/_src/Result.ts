/**
 * @tsplus type Result
 */
export type Result<W, E, A> = Success<A> | SuccessWithWarning<W, A> | Failure<E>

/**
 * @tsplus type ResultOps
 */
export interface ResultOps {}
export const Result: ResultOps = {}

export const _T = Symbol.for("@tsplus/runtime/Result/_T")
export type _T = typeof _T

/**
 * @tsplus type Result/Success
 */
export interface Success<A> {
  readonly [_T]?: {
    _W: (_: never) => never
    _E: (_: never) => never
    _A: (_: never) => A
  }
  readonly _tag: "Success"
  readonly success: A
}

/**
 * @tsplus type Result/SuccessWithWarning
 */
export interface SuccessWithWarning<W, A> {
  readonly [_T]?: {
    _W: (_: never) => W
    _E: (_: never) => never
    _A: (_: never) => A
  }
  readonly _tag: "SuccessWithWarning"
  readonly success: A
  readonly warning: W
}

/**
 * @tsplus type Result/Failure
 */
export interface Failure<E> {
  readonly [_T]?: {
    _W: (_: never) => never
    _E: (_: never) => E
    _A: (_: never) => never
  }
  readonly _tag: "Failure"
  readonly failure: E
}

/**
 * @tsplus unify Result/Success
 * @tsplus unify Result/SuccessWithWarning
 * @tsplus unify Result/Failure
 */
export function unifyResult<X extends Result<any, any, any>>(
  self: X
): Result<
  [X] extends [{
    readonly [_T]?: {
      _W: (_: never) => infer W
      _E: (_: never) => infer E
      _A: (_: never) => infer A
    }
  }] ? W
    : never,
  [X] extends [{
    readonly [_T]?: {
      _W: (_: never) => infer W
      _E: (_: never) => infer E
      _A: (_: never) => infer A
    }
  }] ? E
    : never,
  [X] extends [{
    readonly [_T]?: {
      _W: (_: never) => infer W
      _E: (_: never) => infer E
      _A: (_: never) => infer A
    }
  }] ? A
    : never
> {
  return self
}

/**
 * @tsplus fluent Result fold
 */
export function fold<W, E, A, T0, T1>(
  self: Result<W, E, A>,
  onSuccess: (a: A, w: Maybe<W>) => T0,
  onFailure: (e: E) => T1
) {
  switch (self._tag) {
    case "Failure": {
      return onFailure(self.failure)
    }
    case "Success": {
      return onSuccess(self.success, Maybe.none)
    }
    case "SuccessWithWarning": {
      return onSuccess(self.success, Maybe.some(self.warning))
    }
  }
}

/**
 * @tsplus static ResultOps success
 */
export function success<A>(result: A): Result<never, never, A>
export function success<A, W>(result: A, warning: Maybe<W>): Result<W, never, A>
export function success<A, W>(result: A, warning?: Maybe<W>): Result<W, never, A> {
  if (warning && warning.isSome()) {
    return {
      _tag: "SuccessWithWarning",
      success: result,
      warning: warning.value
    }
  }
  return {
    _tag: "Success",
    success: result
  }
}

/**
 * @tsplus static ResultOps fail
 */
export function fail<E>(error: E): Result<never, E, never> {
  return {
    _tag: "Failure",
    failure: error
  }
}

/**
 * @tsplus static ResultOps successWithWarning
 */
export function successWithWarning<W, A>(result: A, warning: W): Result<W, never, A> {
  return {
    _tag: "SuccessWithWarning",
    success: result,
    warning
  }
}

/**
 * @tsplus fluent Result isSuccess
 */
export function isSuccess<W, E, A>(self: Result<W, E, A>): self is Success<A> {
  return self._tag === "Success"
}

/**
 * @tsplus fluent Result isFailure
 */
export function isFailure<W, E, A>(self: Result<W, E, A>): self is Failure<E> {
  return self._tag === "Failure"
}

/**
 * @tsplus fluent Result isSuccessWihWarning
 */
export function isSuccessWihWarning<W, E, A>(
  self: Result<W, E, A>
): self is SuccessWithWarning<W, A> {
  return self._tag === "SuccessWithWarning"
}

/**
 * @tsplus fluent Result getSuccess
 */
export function getSuccess<W, E, A>(self: Result<W, E, A>) {
  return self.isFailure() ? Maybe.none : Maybe.some(self.success)
}

/**
 * @tsplus fluent Result getFailure
 */
export function getFailure<W, E, A>(self: Result<W, E, A>) {
  return self.isFailure() ? Maybe.some(self.failure) : Maybe.none
}

/**
 * @tsplus fluent Result getWarning
 */
export function getWarning<W, E, A>(self: Result<W, E, A>) {
  return self.isSuccessWihWarning() ? Maybe.some(self.warning) : Maybe.none
}

/**
 * @tsplus fluent Result getWarningOrFailure
 */
export function getWarningOrError<W, E, A>(self: Result<W, E, A>) {
  return self.fold((_, w) => w.map(Either.left), (e) => Maybe.some(Either.right(e)))
}

/**
 * @tsplus fluent Result map
 */
export function map_<W, E, A, B>(self: Result<W, E, A>, f: (a: A) => B): Result<W, E, B> {
  return self.fold((a, w) => Result.success(f(a), w), Result.fail)
}
