import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @tsplus fluent Chunk split
 */
export function split_<A>(self: Chunk<A>, n: number): Chunk<Chunk<A>> {
  const length = concreteChunkId(self).length
  const k = Math.floor(n)
  const quotient = Math.floor(length / k)
  const remainder = length % k

  let chunks = Chunk.empty<Chunk<A>>()
  let i = 0

  let chunk = Chunk.empty<A>()

  self.forEach((a) => {
    chunk = chunk.append(a)
    if (
      (i <= remainder && concreteChunkId(chunk).length > quotient) ||
      (i > remainder && concreteChunkId(chunk).length >= quotient)
    ) {
      chunks = chunks.append(chunk)
      chunk = Chunk.empty()
    }
    i++
  })

  if (concreteChunkId(chunk).length > 0) {
    chunks = chunks.append(chunk)
  }

  return chunks
}

/**
 * Splits this chunk into `n` equally sized chunks.
 *
 * @tsplus static Chunk/Aspects split
 */
export const split = Pipeable(split_)
