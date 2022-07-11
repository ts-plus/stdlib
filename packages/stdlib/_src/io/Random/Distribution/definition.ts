import type { RandomGenerator } from "@tsplus/stdlib/io/Random/Generator/RandomGenerator"

/**
 * Generate random value based on a given RandomGenerator. Return the generated
 * value and an offsetted version of the RandomGenerator.
 *
 * @tsplus type Random.Distribution
 */
export type Distribution<T> = (rng: RandomGenerator) => T

/**
 * @tsplus type Random.Distribution.Ops
 */
export interface DistributionOps {}
export const Distribution: DistributionOps = {}
