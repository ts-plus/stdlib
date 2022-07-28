/**
 * @tsplus static SortedSet.Aspects flatMap
 * @tsplus pipeable SortedSet flatMap
 */
export function flatMap<A, B>(ord: Ord<B>, f: (a: A) => Collection<B>) {
  return (self: SortedSet<A>): SortedSet<B> => {
    let out = SortedSet.empty<B>(ord)
    self.forEach((a) => {
      for (const b of f(a)) {
        if (!out.has(b)) {
          out = out.add(b)
        }
      }
    })
    return out
  }
}
