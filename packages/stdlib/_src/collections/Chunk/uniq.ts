/**
 * Remove duplicates from an array, keeping the first occurrence of an element.
 *
 * @tsplus static Chunk.Aspects uniq
 * @tsplus pipeable Chunk uniq
 */
export function uniq<A>(E: Equivalence<A>) {
  return (self: Chunk<A>): Chunk<A> => {
    let out = Chunk.empty<A>()
    for (let i = 0; i < self.length; i++) {
      const a = self.unsafeGet(i)
      if (!out.elem(E, a)) {
        out = out.append(a)
      }
    }
    return self.length === out.length ? self : out
  }
}
