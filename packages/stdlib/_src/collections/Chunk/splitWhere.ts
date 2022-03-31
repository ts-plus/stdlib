import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";
/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @tsplus fluent Chunk splitWhere
 */
export function splitWhere_<A>(
  self: Chunk<A>,
  f: Predicate<A>
): Tuple<[Chunk<A>, Chunk<A>]> {
  const iterator = concreteChunkId(self)._arrayLikeIterator();
  let next;
  let cont = true;
  let i = 0;

  while (cont && (next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let j = 0;
    while (cont && j < len) {
      const a = array[j]!;
      if (f(a)) {
        cont = false;
      } else {
        i++;
        j++;
      }
    }
  }

  return self.splitAt(i);
}

/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @tsplus static Chunk/Aspects splitWhere
 */
export const splitWhere = Pipeable(splitWhere_);
