/**
 * @tsplus type Duration
 * @tsplus companion DurationOps
 */
export class Duration implements Equals {
  constructor(readonly millis: number) {}

  [Equals.sym](this: this, other: unknown): boolean {
    return other instanceof Duration && this.millis === other.millis;
  }

  [Hash.sym](this: this): number {
    return Hash.number(this.millis);
  }
}

/**
 * @tsplus getter number millis
 * @tsplus static DurationOps millis
 */
export function millis<N extends number>(self: IsInt<N>) {
  return new Duration(self);
}

/**
 * @tsplus getter number seconds
 * @tsplus static DurationOps seconds
 */
export function seconds<N extends number>(self: IsInt<N>) {
  return new Duration(self * 1000);
}

/**
 * @tsplus getter number minutes
 * @tsplus static DurationOps minutes
 */
export function minutes<N extends number>(self: IsInt<N>) {
  return new Duration(self * 60_000);
}

/**
 * @tsplus getter number hours
 * @tsplus static DurationOps hours
 */
export function hours<N extends number>(self: IsInt<N>) {
  return new Duration(self * 3_600_000);
}

/**
 * @tsplus getter number days
 * @tsplus static DurationOps days
 */
export function days<N extends number>(self: IsInt<N>) {
  return new Duration(self * 86_400_000);
}

/**
 * @tsplus getter number weeks
 * @tsplus static DurationOps weeks
 */
export function weeks<N extends number>(self: IsInt<N>) {
  return new Duration(self * 604_800_000);
}

/**
 * @tsplus operator Duration *
 * @tsplus fluent Duration times
 */
export function times_<N extends number>(self: Duration, times: IsInt<N>) {
  return new Duration(self.millis * times);
}

export const times = Pipeable(times_);

/**
 * @tsplus operator Duration *
 */
export function timesInverted<N extends number>(times: IsInt<N>, self: Duration) {
  return new Duration(self.millis * times);
}

/**
 * @tsplus operator Duration +
 * @tsplus fluent Duration add
 */
export function add_(self: Duration, that: Duration) {
  return new Duration(self.millis + that.millis);
}

export const add = Pipeable(add_);

/**
 * @tsplus operator Duration -
 * @tsplus fluent Duration subtract
 */
export function subtract_(self: Duration, that: Duration) {
  return new Duration(self.millis - that.millis);
}

export const subtract = Pipeable(subtract_);

/**
 * @tsplus operator Duration <
 * @tsplus fluent Duration lowerThen
 */
export function lowerThen_(self: Duration, that: Duration) {
  return self.millis < that.millis;
}

export const lowerThen = Pipeable(lowerThen_);

/**
 * @tsplus operator Duration <=
 * @tsplus fluent Duration lowerThenOrEqual
 */
export function lowerThenOrEqual_(self: Duration, that: Duration) {
  return self.millis <= that.millis;
}

export const lowerThenOrEqual = Pipeable(lowerThenOrEqual_);

/**
 * @tsplus operator Duration >
 * @tsplus fluent Duration greaterThen
 */
export function greaterThen_(self: Duration, that: Duration) {
  return self.millis > that.millis;
}

export const greaterThen = Pipeable(greaterThen_);

/**
 * @tsplus operator Duration >=
 * @tsplus fluent Duration greaterThenOrEqual
 */
export function greaterThenOrEqual_(self: Duration, that: Duration) {
  return self.millis >= that.millis;
}

export const greaterThenOrEqual = Pipeable(greaterThenOrEqual_);

/**
 * @tsplus operator Duration ==
 * @tsplus fluent Duration equals
 */
export function equals_(self: Duration, that: Duration) {
  return self.millis === that.millis;
}

export const equals = Pipeable(equals_);
