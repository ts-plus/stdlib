import type { ArrayInt64 } from "@tsplus/stdlib/io/Random/Distribution/_internal/ArrayInt"
import { fromNumberToArrayInt64, substractArrayInt64 } from "@tsplus/stdlib/io/Random/Distribution/_internal/ArrayInt"
import { uniformArrayIntDistributionInternal } from "@tsplus/stdlib/io/Random/Distribution/_internal/uniformArrayIntDistributionInternal"
import { uniformIntDistributionInternal } from "@tsplus/stdlib/io/Random/Distribution/_internal/uniformIntDistributionInternal"
import type { Distribution } from "@tsplus/stdlib/io/Random/Distribution/definition"
import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

const sharedA: ArrayInt64 = { sign: 1, data: [0, 0] }
const sharedB: ArrayInt64 = { sign: 1, data: [0, 0] }
const sharedC: ArrayInt64 = { sign: 1, data: [0, 0] }
const sharedData = [0, 0]

function uniformLargeIntInternal(
  from: number,
  to: number,
  rangeSize: number,
  rng: RandomGenerator
): number {
  const rangeSizeArrayIntValue = rangeSize <= Number.MAX_SAFE_INTEGER
    ? fromNumberToArrayInt64(sharedC, rangeSize) // no possible overflow given rangeSize is in a safe range
    : substractArrayInt64(
      sharedC,
      fromNumberToArrayInt64(sharedA, to),
      fromNumberToArrayInt64(sharedB, from)
    ) // rangeSize might be incorrect, we compute a safer range

  // Adding 1 to the range
  if (rangeSizeArrayIntValue.data[1] === 0xffffffff) {
    // rangeSizeArrayIntValue.length === 2 by construct
    // rangeSize >= 0x00000001_00000000 and rangeSize <= 0x003fffff_fffffffe
    // with Number.MAX_SAFE_INTEGER - Number.MIN_SAFE_INTEGER = 0x003fffff_fffffffe
    rangeSizeArrayIntValue.data[0] += 1
    rangeSizeArrayIntValue.data[1] = 0
  } else {
    rangeSizeArrayIntValue.data[1] += 1
  }

  uniformArrayIntDistributionInternal(sharedData, rangeSizeArrayIntValue.data, rng)
  return sharedData[0]! * 0x100000000 + sharedData[1]! + from
}

function uniformIntInternal(from: number, to: number, rng: RandomGenerator): number {
  const rangeSize = to - from
  if (rangeSize <= 0xffffffff) {
    // Calling uniformIntDistributionInternal can be considered safe
    // up-to 2**32 values. Above this range it may miss values.
    let g = uniformIntDistributionInternal(rangeSize + 1, rng)
    g += from
    return g
  }
  return uniformLargeIntInternal(from, to, rangeSize, rng)
}

/**
 * Uniformly generate random integer values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 *
 * @tsplus static Random.Distribution.Ops uniformIntDistribution
 */
export function uniformIntDistribution(from: number, to: number): Distribution<number>
/**
 * Uniformly generate random integer values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 * @param rng - Instance of RandomGenerator to extract random values from
 */
export function uniformIntDistribution(from: number, to: number, rng: RandomGenerator): number
export function uniformIntDistribution(from: number, to: number, rng?: RandomGenerator) {
  if (rng != null) {
    return uniformIntInternal(from, to, rng)
  }
  return (rng: RandomGenerator) => uniformIntInternal(from, to, rng)
}
