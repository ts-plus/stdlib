import { Equals } from "@tsplus/stdlib/structure/Equals"
import { Hash } from "@tsplus/stdlib/structure/Hash"

declare global {
  /**
   * @tsplus type number
   */
  export interface Number {}
}

/**
 * @tsplus type Duration
 * @tsplus companion DurationOps
 */
export class Duration implements Equals, Hash {
  constructor(readonly millis: number) {}

  [Equals.sym](this: this, other: unknown): boolean {
    return other instanceof Duration && this.millis === other.millis
  }

  [Hash.sym](this: this): number {
    return Hash.number(this.millis)
  }
}

/**
 * @tsplus getter number millis
 */
export function millis(self: number) {
  return new Duration(self)
}

/**
 * @tsplus getter number seconds
 */
export function seconds(self: number) {
  return new Duration(self * 1000)
}

/**
 * @tsplus getter number minutes
 */
export function minutes(self: number) {
  return new Duration(self * 60_000)
}

/**
 * @tsplus getter number hours
 */
export function hours(self: number) {
  return new Duration(self * 3_600_000)
}

/**
 * @tsplus getter number days
 */
export function days(self: number) {
  return new Duration(self * 86_400_000)
}

/**
 * @tsplus operator Duration *
 * @tsplus fluent Duration times
 */
export function times(self: Duration, times: number) {
  return new Duration(self.millis * times)
}

/**
 * @tsplus operator Duration *
 */
export function timesInverted(times: number, self: Duration) {
  return new Duration(self.millis * times)
}

/**
 * @tsplus operator Duration +
 * @tsplus fluent Duration add
 */
export function add(self: Duration, that: Duration) {
  return new Duration(self.millis + that.millis)
}

/**
 * @tsplus operator Duration -
 * @tsplus fluent Duration add
 */
export function subtract(self: Duration, that: Duration) {
  return new Duration(self.millis - that.millis)
}
