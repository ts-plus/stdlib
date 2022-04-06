/**
 * @tsplus type Result
 */
export type Result<W, E, A> = Success<A> | SuccessWithWarning<W, A> | Failure<E>;

/**
 * @tsplus type ResultOps
 */
export interface ResultOps {}
export const Result: ResultOps = {};

/**
 * @tsplus type Result/Success
 */
export interface Success<A> {
  readonly _tag: "Success";
  readonly result: A;
}

/**
 * @tsplus type Result/SuccessWithWarning
 */
export interface SuccessWithWarning<W, A> {
  readonly _tag: "SuccessWithWarning";
  readonly result: A;
  readonly warning: W;
}

/**
 * @tsplus type Result/Failure
 */
export interface Failure<E> {
  readonly _tag: "Failure";
  readonly error: E;
}

/**
 * @tsplus fluent Result fold
 */
export function fold<W, E, A, T0, T1, T2>(
  self: Result<W, E, A>,
  onSuccess: (a: A) => T0,
  onSuccessWithWarning: (w: W, a: A) => T1,
  onFailure: (e: E) => T2
) {
  switch (self._tag) {
    case "Failure": {
      return onFailure(self.error);
    }
    case "Success": {
      return onSuccess(self.result);
    }
    case "SuccessWithWarning": {
      return onSuccessWithWarning(self.warning, self.result);
    }
  }
}

/**
 * @tsplus static ResultOps success
 */
export function success<A>(result: A): Result<never, never, A> {
  return {
    _tag: "Success",
    result
  };
}

/**
 * @tsplus static ResultOps fail
 */
export function fail<E>(error: E): Result<never, E, never> {
  return {
    _tag: "Failure",
    error
  };
}

/**
 * @tsplus static ResultOps successWithWarning
 */
export function successWithWarning<W, A>(warning: W, result: A): Result<W, never, A> {
  return {
    _tag: "SuccessWithWarning",
    result,
    warning
  };
}

/**
 * @tsplus fluent Result isSuccess
 */
export function isSuccess<W, E, A>(self: Result<W, E, A>): self is Success<A> {
  return self._tag === "Success";
}

/**
 * @tsplus fluent Result isFailure
 */
export function isFailure<W, E, A>(self: Result<W, E, A>): self is Failure<E> {
  return self._tag === "Failure";
}

/**
 * @tsplus fluent Result isSuccessWihWarning
 */
export function isSuccessWihWarning<W, E, A>(self: Result<W, E, A>): self is SuccessWithWarning<W, A> {
  return self._tag === "SuccessWithWarning";
}

/**
 * @tsplus fluent Result getSuccess
 */
export function getSuccess<W, E, A>(self: Result<W, E, A>) {
  return self.isFailure() ? Option.none : Option.some(self.result);
}

/**
 * @tsplus fluent Result getFailure
 */
export function getFailure<W, E, A>(self: Result<W, E, A>) {
  return self.isFailure() ? Option.some(self.error) : Option.none;
}

/**
 * @tsplus fluent Result getWarning
 */
export function getWarning<W, E, A>(self: Result<W, E, A>) {
  return self.isSuccessWihWarning() ? Option.some(self.warning) : Option.none;
}

/**
 * @tsplus fluent Result getWarningOrFailure
 */
export function getWarningOrError<W, E, A>(self: Result<W, E, A>) {
  return self.fold(() => Option.none, (w) => Option.some(Either.left(w)), (e) => Option.some(Either.right(e)));
}
