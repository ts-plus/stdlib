import type { ArrayInt } from "@tsplus/stdlib/io/Random/Distribution/_internal/ArrayInt"
import { uniformIntDistributionInternal } from "@tsplus/stdlib/io/Random/Distribution/_internal/uniformIntDistributionInternal"
import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

/**
 * Uniformly generate an `ArrayInt` in the range [0, rangeSize].
 *
 * @remarks
 * In the worst case scenario it may discard half of the randomly generated
 * values. Worst case being: most significant number is `1` and remaining part
 * evaluates to `0`.
 *
 * @internal
 */
export function uniformArrayIntDistributionInternal(
  out: ArrayInt["data"],
  rangeSize: ArrayInt["data"],
  rng: RandomGenerator
): ArrayInt["data"] {
  const rangeLength = rangeSize.length

  // We iterate until we find a valid value for arrayInt
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // We compute a new value for arrayInt
    for (let index = 0; index !== rangeLength; ++index) {
      const indexRangeSize = index === 0 ? rangeSize[0]! + 1 : 0x100000000
      out[index] = uniformIntDistributionInternal(indexRangeSize, rng)
    }

    // If in the correct range we can return it
    for (let index = 0; index !== rangeLength; ++index) {
      const current = out[index]!
      const currentInRange = rangeSize[index]!
      if (current < currentInRange) {
        return out // arrayInt < rangeSize
      } else if (current > currentInRange) {
        break // arrayInt > rangeSize
      }
    }
    // Otherwise we need to try another one
  }
}
