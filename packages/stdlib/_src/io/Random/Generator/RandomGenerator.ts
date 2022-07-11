export interface RandomGenerator {
  setSeed(seed: number): void
  next(): number
  jump?(): RandomGenerator
  min(): number // inclusive
  max(): number // inclusive
}

export function generateN(rng: RandomGenerator, num: number): ReadonlyArray<number> {
  const out: Array<number> = []
  for (let idx = 0; idx != num; ++idx) {
    const nextOut = rng.next()
    out.push(nextOut)
  }
  return out
}

export function skipN(rng: RandomGenerator, num: number): void {
  generateN(rng, num)
}
