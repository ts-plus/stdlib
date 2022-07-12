import type { Distribution } from "@tsplus/stdlib/io/Random/Distribution/definition"
import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

function uniformBigIntInternal(from: bigint, diff: bigint, rng: RandomGenerator): bigint {
  const MinRng = BigInt(rng.min())
  const NumValues = BigInt(rng.max() - rng.min() + 1)

  // Number of iterations required to have enough random
  // to build uniform entries in the asked range
  let FinalNumValues = NumValues
  let NumIterations = BigInt(1)
  while (FinalNumValues < diff) {
    FinalNumValues *= NumValues
    ;++NumIterations
  }
  const MaxAcceptedRandom = FinalNumValues - (FinalNumValues % diff)

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Aggregate mutiple calls to next() into a single random value
    let value = BigInt(0)
    for (let num = BigInt(0); num !== NumIterations; ++num) {
      const out = rng.next()
      value = NumValues * value + (BigInt(out) - MinRng)
    }
    if (value < MaxAcceptedRandom) {
      const inDiff = value % diff
      return inDiff + from
    }
  }
}

/**
 * Uniformly generate random bigint values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 *
 * @tsplus static Random.Distribution.Ops uniformBigIntDistribution
 */
export function uniformBigIntDistribution(from: bigint, to: bigint): Distribution<bigint>
/**
 * Uniformly generate random bigint values between `from` (inclusive) and `to`
 * (inclusive).
 *
 * @param from - Lower bound of the range (inclusive)
 * @param to - Upper bound of the range (inclusive)
 * @param rng - Instance of RandomGenerator to extract random values from
 */
export function uniformBigIntDistribution(from: bigint, to: bigint, rng: RandomGenerator): bigint
export function uniformBigIntDistribution(from: bigint, to: bigint, rng?: RandomGenerator) {
  const diff = to - from + BigInt(1)
  if (rng != null) {
    return uniformBigIntInternal(from, diff, rng)
  }
  return (rng: RandomGenerator) => uniformBigIntInternal(from, diff, rng)
}
