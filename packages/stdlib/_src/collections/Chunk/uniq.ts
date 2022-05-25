/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @tsplus fluent Chunk uniq
 */
export function uniq_<A>(self: Chunk<A>, E: Equivalence<A>): Chunk<A> {
  let out = Chunk.empty<A>()
  for (let i = 0; i < self.length; i++) {
    const a = self.unsafeGet(i)
    if (!out.elem(E, a)) {
      out = out.append(a)
    }
  }
  return self.length === out.length ? self : out
}

/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @tsplus static Chunk/Aspects uniq
 */
export const uniq = Pipeable(uniq_)
