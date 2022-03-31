import { ArrTypeId, concreteChunk, SingletonTypeId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @tsplus fluent Chunk collectWhile
 */
export function collectWhile_<A, B>(self: Chunk<A>, f: (a: A) => Option<B>): Chunk<B> {
  concreteChunk(self);

  switch (self._typeId) {
    case SingletonTypeId: {
      return f(self.a).fold(() => Chunk.empty(), Chunk.single);
    }
    case ArrTypeId: {
      const array = self._arrayLike();
      let dest = Chunk.empty<B>();
      for (let i = 0; i < array.length; i++) {
        const rhs = f(array[i]!);
        if (rhs.isSome()) {
          dest = dest.append(rhs.value);
        } else {
          return dest;
        }
      }
      return dest;
    }
    default: {
      return collectWhile_(self._materialize(), f);
    }
  }
}

/**
 * Transforms all elements of the chunk for as long as the specified partial
 * function is defined.
 *
 * @tsplus static Chunk/Aspects collectWhile
 */
export const collectWhile = Pipeable(collectWhile_);
