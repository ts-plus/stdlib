import { Equals } from "@tsplus/stdlib/structure/Equals"
import { Hash } from "@tsplus/stdlib/structure/Hash"
import type { IsInt } from "@tsplus/stdlib/utilities/Types"

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
 * @tsplus static DurationOps millis
 */
export function millis<N extends number>(self: IsInt<N>) {
  return new Duration(self)
}

/**
 * @tsplus getter number seconds
 * @tsplus static DurationOps seconds
 */
export function seconds<N extends number>(self: IsInt<N>) {
  return new Duration(self * 1000)
}

/**
 * @tsplus getter number minutes
 * @tsplus static DurationOps minutes
 */
export function minutes<N extends number>(self: IsInt<N>) {
  return new Duration(self * 60_000)
}

/**
 * @tsplus getter number hours
 * @tsplus static DurationOps hours
 */
export function hours<N extends number>(self: IsInt<N>) {
  return new Duration(self * 3_600_000)
}

/**
 * @tsplus getter number days
 * @tsplus static DurationOps days
 */
export function days<N extends number>(self: IsInt<N>) {
  return new Duration(self * 86_400_000)
}

/**
 * @tsplus operator Duration *
 * @tsplus fluent Duration times
 */
export function times<N extends number>(self: Duration, times: IsInt<N>) {
  return new Duration(self.millis * times)
}

/**
 * @tsplus operator Duration *
 */
export function timesInverted<N extends number>(times: IsInt<N>, self: Duration) {
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
