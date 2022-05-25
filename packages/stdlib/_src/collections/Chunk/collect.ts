import { ArrTypeId, concreteChunk } from "@tsplus/stdlib/collections/Chunk/definition"

/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @tsplus fluent Chunk collect
 */
export function collect_<A, B>(self: Chunk<A>, f: (a: A) => Option<B>): Chunk<B> {
  concreteChunk(self)

  switch (self._typeId) {
    case ArrTypeId: {
      const array = self._arrayLike()
      let dest = Chunk.empty<B>()
      for (let i = 0; i < array.length; i++) {
        const rhs = f(array[i]!)
        if (rhs.isSome()) {
          dest = dest.append(rhs.value)
        }
      }
      return dest
    }
    default: {
      return collect_(self._materialize(), f)
    }
  }
}

/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @tsplus static Chunk/Aspects collect
 */
export const collect = Pipeable(collect_)
