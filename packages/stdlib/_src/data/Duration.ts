export const DurationSym = Symbol.for("@tsplus/stdlib/data/Duration")
export type DurationSym = typeof DurationSym

/**
 * @tsplus type Duration
 */
export interface Duration extends Equals {
  readonly [DurationSym]: DurationSym
  readonly millis: number
}

export class DurationInternal implements Duration {
  readonly [DurationSym]: DurationSym = DurationSym

  constructor(readonly millis: number) {}

  [Hash.sym](this: this): number {
    return Hash.number(this.millis)
  }

  [Equals.sym](this: this, other: unknown): boolean {
    return Duration.isDuration(other) && this.millis === other.millis
  }
}

/**
 * @tsplus static Duration.Ops isDuration
 */
export function isDuration(u: unknown): u is Duration {
  return typeof u === "object" && u != null && DurationSym in u
}

/**
 * @tsplus type Duration.Ops
 */
export interface DurationOps {
  readonly $: DurationAspects
  readonly Zero: Duration
  readonly Infinity: Duration
}
export const Duration: DurationOps = {
  $: {},
  Zero: new DurationInternal(0),
  Infinity: new DurationInternal(Number.MAX_SAFE_INTEGER)
}

/**
 * @tsplus type Duration.Aspects
 */
export interface DurationAspects {}

/**
 * @tsplus getter number millis
 * @tsplus static Duration.Ops millis
 */
export function millis<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self)
}

/**
 * @tsplus getter number seconds
 * @tsplus static Duration.Ops seconds
 */
export function seconds<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self * 1000)
}

/**
 * @tsplus getter number minutes
 * @tsplus static Duration.Ops minutes
 */
export function minutes<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self * 60_000)
}

/**
 * @tsplus getter number hours
 * @tsplus static Duration.Ops hours
 */
export function hours<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self * 3_600_000)
}

/**
 * @tsplus getter number days
 * @tsplus static Duration.Ops days
 */
export function days<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self * 86_400_000)
}

/**
 * @tsplus getter number weeks
 * @tsplus static Duration.Ops weeks
 */
export function weeks<N extends number>(self: IsInt<N>) {
  return new DurationInternal(self * 604_800_000)
}

/**
 * @tsplus pipeable-operator Duration *
 * @tsplus static Duration.Aspects times
 * @tsplus pipeable Duration times
 */
export function times<N extends number>(times: IsInt<N>) {
  return (self: Duration): Duration => new DurationInternal(self.millis * times)
}

/**
 * @tsplus operator Duration *
 */
export function timesInverted<N extends number>(times: IsInt<N>, self: Duration) {
  return new DurationInternal(self.millis * times)
}

/**
 * @tsplus pipeable-operator Duration +
 * @tsplus static Duration.Aspects add
 * @tsplus pipeable Duration add
 */
export function add(that: Duration) {
  return (self: Duration): Duration => new DurationInternal(self.millis + that.millis)
}

/**
 * @tsplus pipeable-operator Duration -
 * @tsplus static Duration.Aspects subtract
 * @tsplus pipeable Duration subtract
 */
export function subtract(that: Duration) {
  return (self: Duration): Duration => new DurationInternal(self.millis - that.millis)
}

/**
 * @tsplus pipeable-operator Duration <
 * @tsplus static Duration.Aspects lowerThen
 * @tsplus pipeable Duration lowerThen
 */
export function lowerThen(that: Duration) {
  return (self: Duration): boolean => self.millis < that.millis
}

/**
 * @tsplus pipeable-operator Duration <=
 * @tsplus static Duration.Aspects lowerThenOrEqual
 * @tsplus pipeable Duration lowerThenOrEqual
 */
export function lowerThenOrEqual(that: Duration) {
  return (self: Duration): boolean => self.millis <= that.millis
}

/**
 * @tsplus pipeable-operator Duration >
 * @tsplus static Duration.Aspects greaterThen
 * @tsplus pipeable Duration greaterThen
 */
export function greaterThen(that: Duration) {
  return (self: Duration): boolean => self.millis > that.millis
}

/**
 * @tsplus pipeable-operator Duration >=
 * @tsplus static Duration.Aspects greaterThenOrEqual
 * @tsplus pipeable Duration greaterThenOrEqual
 */
export function greaterThenOrEqual(that: Duration) {
  return (self: Duration): boolean => self.millis >= that.millis
}

/**
 * @tsplus pipeable-operator Duration ==
 * @tsplus static Duration.Aspects equals
 * @tsplus pipeable Duration equals
 */
export function equals(that: Duration) {
  return (self: Duration): boolean => self.millis === that.millis
}
