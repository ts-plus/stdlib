import { concreteChunkId } from "@tsplus/stdlib/collections/Chunk/definition";

/**
 * Returns the first element that satisfies the predicate.
 *
 * @tsplus fluent Chunk find
 */
export function find_<A, B extends A>(self: Chunk<A>, f: Refinement<A, B>): Option<B>;
export function find_<A>(self: Chunk<A>, f: Predicate<A>): Option<A>;
export function find_<A>(self: Chunk<A>, f: Predicate<A>): Option<A> {
  const iterator = concreteChunkId(self)._arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;
    while (i < len) {
      const a = array[i]!;
      if (f(a)) {
        return Option.some(a);
      }
      i++;
    }
  }

  return Option.none;
}

/**
 * Returns the first element that satisfies the predicate.
 *
 * @tsplus static Chunk/Aspects find
 */
export function find<A, B extends A>(f: Refinement<A, B>): (self: Chunk<A>) => Option<B>;
export function find<A>(f: Predicate<A>): (self: Chunk<A>) => Option<A>;
export function find<A>(f: Predicate<A>) {
  return (self: Chunk<A>): Option<A> => self.find(f);
}
