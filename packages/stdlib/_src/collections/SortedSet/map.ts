/**
 * @tsplus static SortedSet.Aspects map
 * @tsplus pipeable SortedSet map
 */
export function map<A, B>(ord: Ord<B>, f: (a: A) => B) {
  return (self: SortedSet<A>): SortedSet<B> => {
    let out = SortedSet.empty(ord)
    self.forEach((a) => {
      const b = f(a)
      if (!out.has(b)) {
        out = out.add(b)
      }
    })
    return out
  }
}
