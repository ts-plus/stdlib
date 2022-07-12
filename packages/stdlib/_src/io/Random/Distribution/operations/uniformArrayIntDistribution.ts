import type { ArrayInt } from "@tsplus/stdlib/io/Random/Distribution/_internal/ArrayInt"
import {
  addArrayIntToNew,
  addOneToPositiveArrayInt,
  substractArrayIntToNew,
  trimArrayIntInplace
} from "@tsplus/stdlib/io/Random/Distribution/_internal/ArrayInt"
import { uniformArrayIntDistributionInternal } from "@tsplus/stdlib/io/Random/Distribution/_internal/uniformArrayIntDistributionInternal"
import type { Distribution } from "@tsplus/stdlib/io/Random/Distribution/definition"
import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

/** @internal */
function uniformArrayIntInternal(from: ArrayInt, to: ArrayInt, rng: RandomGenerator): ArrayInt {
  const rangeSize = trimArrayIntInplace(addOneToPositiveArrayInt(substractArrayIntToNew(to, from)))
  const emptyArrayIntData = rangeSize.data.slice(0)
  const g = uniformArrayIntDistributionInternal(emptyArrayIntData, rangeSize.data, rng)
  return trimArrayIntInplace(addArrayIntToNew({ sign: 1, data: g }, from))
}

/**
 * Uniformly generate random ArrayInt values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 *
 * @tsplus static Random.Distribution.Ops uniformArrayIntDistribution
 */
export function uniformArrayIntDistribution(from: ArrayInt, to: ArrayInt): Distribution<ArrayInt>
/**
 * Uniformly generate random ArrayInt values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 * @param rng - Instance of RandomGenerator to extract random values from
 */
export function uniformArrayIntDistribution(from: ArrayInt, to: ArrayInt, rng: RandomGenerator): ArrayInt
export function uniformArrayIntDistribution(from: ArrayInt, to: ArrayInt, rng?: RandomGenerator) {
  if (rng != null) {
    return uniformArrayIntInternal(from, to, rng)
  }
  return function(rng: RandomGenerator) {
    return uniformArrayIntInternal(from, to, rng)
  }
}
