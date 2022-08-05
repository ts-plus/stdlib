import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Statefully maps over the chunk, producing new elements of type `B`.
 *
 * @tsplus static Chunk.Aspects mapAccum
 * @tsplus pipeable Chunk mapAccum
 */
export function mapAccum<A, B, S>(s: S, f: (s: S, a: A) => Tuple<[S, B]>) {
  return (self: Chunk<A>): Tuple<[S, Chunk<B>]> => {
    const iterator = concreteChunkId(self)._arrayLikeIterator()
    let next
    let s1 = s
    let builder = Chunk.empty<B>()

    while ((next = iterator.next()) && !next.done) {
      const array = next.value
      const len = array.length
      let i = 0
      while (i < len) {
        const a = array[i]!
        const x = f(s1, a)
        s1 = x.get(0)
        builder = builder.append(x.get(1))
        i++
      }
    }

    return Tuple(s1, builder)
  }
}
