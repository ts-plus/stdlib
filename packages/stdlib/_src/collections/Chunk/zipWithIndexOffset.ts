import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @tsplus static Chunk.Aspects zipWithIndexOffset
 * @tsplus pipeable Chunk zipWithIndexOffset
 */
export function zipWithIndexOffset(offset: number) {
  return <A>(self: Chunk<A>): Chunk<Tuple<[A, number]>> => {
    const iterator = concreteChunkId(self)._arrayLikeIterator()
    let next
    let i = offset
    let builder = Chunk.empty<Tuple<[A, number]>>()
    while ((next = iterator.next()) && !next.done) {
      const array = next.value
      const len = array.length
      let j = 0
      while (j < len) {
        const a = array[j]!
        builder = builder.append(Tuple(a, i))
        j++
        i++
      }
    }

    return builder
  }
}
